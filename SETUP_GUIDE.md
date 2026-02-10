# AI Guruji - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

This will automatically start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:5173`

### 3. Open in Browser
Navigate to `http://localhost:5173` in your web browser.

## What's New

### Local SQLite Database
- Removed Supabase dependency
- All data stored locally in `data/guruji.db`
- Authentication handled locally with bcryptjs password hashing

### Clean White Theme
- Removed dark mode (white theme only)
- Blue primary color (#2563eb)
- Improved typography and spacing
- Modern card designs with subtle borders

### Modern UI Design
- Redesigned Home page with feature grid
- Improved Login/Register forms
- Enhanced Dashboard with better recommendations display
- Interactive components with smooth transitions

## Key Features

### Authentication
- Email/password registration and login
- Secure token-based sessions
- Password hashing with bcryptjs

### Assessment System
- Interest assessments
- Aptitude tests
- Non-conventional career assessments
- Progress tracking

### Career Recommendations
- AI-powered recommendations based on assessments
- Match percentage for each career suggestion
- Detailed career descriptions

### Database
The local SQLite database includes:
- `users` - User accounts and profiles
- `sessions` - Authentication sessions
- `assessment_results` - User assessment scores
- `career_recommendations` - Generated recommendations

## API Server

The backend runs on port 5000 and provides REST API endpoints:

### Auth Endpoints
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/verify` - Check session
- `POST /api/auth/logout` - Logout

### Data Endpoints
- `GET/POST /api/assessments/:userId`
- `GET/POST /api/recommendations/:userId`
- `GET/PUT /api/users/:userId`

### Health Check
- `GET /api/health` - Server status

## Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use, kill the process or modify the port in:
- Backend: `server.js` (change PORT constant)
- Frontend: `vite.config.ts` (change server config)

### Database Issues
Delete `data/guruji.db` to reset the database. It will be recreated automatically on next server start.

### Environment Variables
Make sure `.env` is in the project root with:
```
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
ai-guruji/
├── src/
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   ├── components/         # Reusable components
│   ├── store/             # State management (Zustand)
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Helper functions
│   └── config/            # Configuration
├── server.js              # Express backend
├── .env                   # Environment variables
├── package.json           # Dependencies
└── tailwind.config.js     # Tailwind CSS config
```

## Next Steps

1. Register an account
2. Complete an assessment
3. View AI-generated career recommendations
4. Explore different career options

## Support

For issues or questions, check:
1. The console (browser dev tools and terminal)
2. Database logs in the server output
3. Network requests in browser dev tools

Happy exploring!
