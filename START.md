# Quick Start Guide

## If Port 5000 is in Use

The application now uses **port 3000** by default (changed from 5000). If you still have a process running on port 5000, kill it first:

### On macOS/Linux:
```bash
# Kill process on port 5000
lsof -i :5000
# Copy the PID from the output and kill it:
kill -9 <PID>

# Or use this one-liner:
kill -9 $(lsof -t -i:5000)
```

### On Windows (PowerShell):
```powershell
# Find and kill process on port 5000
Get-Process | Where-Object { $_.Handles -like "*5000*" } | Stop-Process -Force

# Or find by port:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Starting the App

Once you've cleared port 5000 (if needed), start the application:

```bash
npm run dev
```

This will start:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173

## Environment Variables

The `.env` file is already configured:
```
VITE_API_URL=http://localhost:3000
```

## Ports Used

- **3000** - Express backend API
- **5173** - Vite frontend dev server

## If You See Errors

1. **"EADDRINUSE" on port 3000**: Kill any process using port 3000:
   ```bash
   kill -9 $(lsof -t -i:3000)
   ```

2. **Module not found `@supabase/supabase-js`**: Already removed. The app now uses local authentication only.

3. **Database not found**: The database will auto-create at `data/guruji.db` when the server starts.

## Testing the API

Once the server is running, test it:
```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok","message":"Server is running"}`
