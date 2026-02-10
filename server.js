import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcryptjs from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite Database Setup
const DB_PATH = path.join(__dirname, 'data', 'guruji.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database at:', DB_PATH);
    initializeDatabase();
  }
});

// Initialize Database Tables
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        avatar_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Assessment Results table
    db.run(`
      CREATE TABLE IF NOT EXISTS assessment_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        assessment_type TEXT NOT NULL,
        scores TEXT NOT NULL,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Career Recommendations table
    db.run(`
      CREATE TABLE IF NOT EXISTS career_recommendations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        career TEXT NOT NULL,
        match_percentage INTEGER,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Sessions table
    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Database tables initialized successfully');
  });
}

// Helper function to run queries with promises
function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function getAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Generate session token
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const result = await runAsync(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name || '']
    );

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await runAsync(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [result.lastID, token, expiresAt.toISOString()]
    );

    res.json({
      id: result.lastID,
      email,
      name: name || '',
      token,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await getAsync('SELECT id, password, name FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await runAsync(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, token, expiresAt.toISOString()]
    );

    res.json({
      id: user.id,
      email,
      name: user.name || '',
      token,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { token } = req.body;

    const session = await getAsync(
      'SELECT user_id, expires_at FROM sessions WHERE token = ?',
      [token]
    );

    if (!session) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const expiresAt = new Date(session.expires_at);
    if (expiresAt < new Date()) {
      await runAsync('DELETE FROM sessions WHERE token = ?', [token]);
      return res.status(401).json({ error: 'Token expired' });
    }

    const user = await getAsync(
      'SELECT id, email, name FROM users WHERE id = ?',
      [session.user_id]
    );

    res.json({
      id: user.id,
      email: user.email,
      name: user.name || '',
      token,
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

app.post('/api/auth/logout', async (req, res) => {
  try {
    const { token } = req.body;
    await runAsync('DELETE FROM sessions WHERE token = ?', [token]);
    res.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Assessment Routes
app.post('/api/assessments/save', async (req, res) => {
  try {
    const { userId, assessmentType, scores } = req.body;

    if (!userId || !assessmentType || !scores) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await runAsync(
      'INSERT INTO assessment_results (user_id, assessment_type, scores) VALUES (?, ?, ?)',
      [userId, assessmentType, JSON.stringify(scores)]
    );

    res.json({
      id: result.lastID,
      success: true,
    });
  } catch (error) {
    console.error('Save assessment error:', error);
    res.status(500).json({ error: 'Failed to save assessment' });
  }
});

app.get('/api/assessments/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await allAsync(
      'SELECT assessment_type, scores, completed_at FROM assessment_results WHERE user_id = ? ORDER BY completed_at DESC',
      [userId]
    );

    const formattedResults = results.map(r => ({
      type: r.assessment_type,
      scores: JSON.parse(r.scores),
      completedAt: r.completed_at,
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({ error: 'Failed to fetch assessments' });
  }
});

// Career Recommendations Routes
app.post('/api/recommendations/save', async (req, res) => {
  try {
    const { userId, career, matchPercentage, description } = req.body;

    if (!userId || !career) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await runAsync(
      'INSERT INTO career_recommendations (user_id, career, match_percentage, description) VALUES (?, ?, ?, ?)',
      [userId, career, matchPercentage || 0, description || '']
    );

    res.json({
      id: result.lastID,
      success: true,
    });
  } catch (error) {
    console.error('Save recommendations error:', error);
    res.status(500).json({ error: 'Failed to save recommendations' });
  }
});

app.get('/api/recommendations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const recommendations = await allAsync(
      'SELECT id, career, match_percentage, description, created_at FROM career_recommendations WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    res.json(recommendations);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// User Profile Routes
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await getAsync(
      'SELECT id, email, name, avatar_url, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, avatar_url } = req.body;

    await runAsync(
      'UPDATE users SET name = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name || '', avatar_url || '', userId]
    );

    const user = await getAsync(
      'SELECT id, email, name, avatar_url FROM users WHERE id = ?',
      [userId]
    );

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database: ${DB_PATH}`);
});
