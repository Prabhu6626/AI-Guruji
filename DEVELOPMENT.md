# Development Guide

## Architecture Overview

AI Guruji uses a modern full-stack architecture:

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation

### Backend
- **Express.js** server
- **SQLite3** for local database
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## File Structure

```
ai-guruji/
├── src/
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Assessments.tsx
│   │   ├── AssessmentTest.tsx
│   │   ├── Reports.tsx
│   │   ├── ChatBot.tsx
│   │   └── Settings.tsx
│   │
│   ├── components/         # Reusable components
│   │   ├── Layout.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── AuthDebug.tsx
│   │
│   ├── store/             # Zustand stores
│   │   ├── authStore.ts
│   │   └── themeStore.ts
│   │
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   │
│   ├── lib/               # Utility functions
│   │   ├── supabase.ts    # API config (no longer Supabase)
│   │   └── debug.ts
│   │
│   ├── config/            # Configuration
│   │   └── features.ts
│   │
│   ├── App.tsx            # Root component
│   └── index.css          # Global styles
│
├── server.js              # Express backend server
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── .env                   # Environment variables
```

## API Endpoints

### Authentication

**POST** `/api/auth/register`
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

**POST** `/api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**POST** `/api/auth/verify`
```json
{
  "token": "jwt_token_here"
}
```

**POST** `/api/auth/logout`
```json
{
  "token": "jwt_token_here"
}
```

### Health Check

**GET** `/health` or `/api/health`

Returns:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Assessment Results Table
```sql
CREATE TABLE assessment_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  assessment_type TEXT NOT NULL,
  scores TEXT NOT NULL,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Career Recommendations Table
```sql
CREATE TABLE career_recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  career TEXT NOT NULL,
  match_percentage INTEGER,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

This runs both:
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

### 2. Making Changes

**Frontend changes** hot-reload automatically with Vite.

**Backend changes** require manual server restart:
```bash
npm run server
```

### 3. Testing

Use the DevTools in your browser:
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls
4. Use Auth Debug component for session info

## Adding New Features

### Adding a New Page

1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Layout.tsx`

### Adding Authentication to a Page

Wrap the route in `PrivateRoute`:

```tsx
<Route
  path="/private"
  element={
    <PrivateRoute>
      <YourComponent />
    </PrivateRoute>
  }
/>
```

### Adding New API Endpoint

1. Add route handler in `server.js`
2. Use in frontend with:
```tsx
const response = await fetch(`${API_URL}/api/endpoint`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### Adding New State with Zustand

Create in `src/store/newStore.ts`:

```tsx
import { create } from 'zustand';

interface StoreState {
  value: string;
  setValue: (value: string) => void;
}

export const useNewStore = create<StoreState>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}));
```

## Styling

The app uses Tailwind CSS with a white theme and blue primary color.

**Color Palette:**
- Primary: Blue (#2563eb)
- Background: White (#ffffff)
- Neutral: Gray (#6b7280)
- Accents: Green, Purple, Orange (for data visualization)

### Updating Styles

1. Tailwind classes work with hot-reload
2. Global styles in `src/index.css`
3. Theme colors in `tailwind.config.js`

## Database Migrations

Currently, tables auto-create on server startup. To add new tables:

1. Edit `initializeDatabase()` function in `server.js`
2. Add `db.run()` call for new table
3. Restart server

## Performance Tips

1. **Lazy load pages** - Already done with React.lazy()
2. **Optimize images** - Keep under 500KB
3. **Bundle analysis** - Run `npm run build` to check size

## Common Development Tasks

### Reset Database
```bash
rm data/guruji.db
npm run server
```

### Clear User Sessions
```bash
# Delete user from database and restart server
```

### View API Responses
1. Open DevTools Network tab
2. Perform action
3. Click request to see response

### Debug Authentication
The `AuthDebug` component shows current auth state. It's visible in development with proper features enabled.

## Deployment

See `SETUP_GUIDE.md` and main `readme.md` for production deployment instructions.

## Further Reading

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://zustand-demo.vercel.app)
- [Express.js](https://expressjs.com)
- [SQLite3](https://www.sqlite.org)
