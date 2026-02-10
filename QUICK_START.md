# Quick Start Card

## 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm run dev

# 3. Open browser
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

## That's It! 🎉

The app is now running with:
- ✅ Backend API on port 3000
- ✅ Frontend on port 5173  
- ✅ SQLite database auto-created
- ✅ White theme enabled
- ✅ Local authentication ready

## First Steps

1. Visit **http://localhost:5173**
2. Click **"Get Started"** or **"Sign Up"**
3. Create account with email/password
4. Login and explore dashboard
5. Take an assessment
6. View career recommendations

## Useful Commands

```bash
# Start everything
npm run dev

# Just backend
npm run server

# Just frontend (if backend already running)
npm run dev:frontend

# Build for production
npm run build

# Check linting
npm run lint
```

## Important Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 3000 | http://localhost:3000 |
| Database | - | data/guruji.db |

## Port Already in Use?

**Kill the process:**
```bash
# macOS/Linux
kill -9 $(lsof -t -i:3000)

# Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Then restart: `npm run dev`

## Test the API

```bash
# Check if backend is running
curl http://localhost:3000/health

# Response should be:
# {"status":"ok","message":"Server is running"}
```

## Database

Auto-created at `data/guruji.db`

**Tables:**
- `users` - User accounts
- `assessment_results` - Test scores
- `career_recommendations` - AI suggestions

## Environment

Already configured in `.env`:
```
VITE_API_URL=http://localhost:3000
```

## Help

📖 Full docs available in:
- `readme.md` - Overview & API
- `DEVELOPMENT.md` - Technical guide
- `TROUBLESHOOTING.md` - Common issues
- `SETUP_GUIDE.md` - Detailed setup

## Features

- ✅ User registration & login
- ✅ 3 assessment types (Interest, Aptitude, Non-Conventional)
- ✅ AI career recommendations
- ✅ Progress tracking
- ✅ Beautiful white theme
- ✅ Mobile responsive
- ✅ Local database (offline capable)

## Next

Start coding! Edit files and they'll hot-reload instantly.

**Happy coding! 🚀**
