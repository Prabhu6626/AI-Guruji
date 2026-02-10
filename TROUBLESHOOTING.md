# Troubleshooting Guide

## Common Issues and Solutions

### 1. Port Already in Use (EADDRINUSE)

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**

Kill the process using port 3000:

**macOS/Linux:**
```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or one-liner:
kill -9 $(lsof -t -i:3000)
```

**Windows (PowerShell):**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Then restart:
```bash
npm run dev
```

### 2. Module Not Found: @supabase/supabase-js

**Error:** `Failed to resolve import "@supabase/supabase-js" from "src/lib/supabase.ts"`

**Solution:**

This error occurs because Supabase was removed in the upgrade. The app now uses local authentication with Express backend.

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Make sure you're running both backend and frontend:
   ```bash
   npm run dev
   ```

### 3. Backend Server Not Starting

**Error:** Server starts but frontend can't reach it

**Solution:**

1. Check if backend is running:
   ```bash
   curl http://localhost:3000/health
   ```

   Should return: `{"status":"ok","message":"Server is running"}`

2. If not running, check `.env` file for correct API URL:
   ```
   VITE_API_URL=http://localhost:3000
   ```

3. Make sure port 3000 is free (see solution #1)

### 4. Database File Not Found

**Error:** Server starts but database operations fail

**Solution:**

The database auto-creates on first run. If it doesn't:

1. Create the data directory:
   ```bash
   mkdir -p data
   ```

2. Make sure the directory has write permissions:
   ```bash
   chmod 755 data
   ```

3. Restart the server:
   ```bash
   npm run server
   ```

The database file will be created at `data/guruji.db`

### 5. CORS Errors

**Error:** `Access to XMLHttpRequest at 'http://localhost:3000/...' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution:**

This shouldn't happen as CORS is enabled in the server. If you do see this:

1. Check server.js has `app.use(cors());` at the top
2. Restart both server and frontend
3. Clear browser cache (Ctrl+Shift+Delete)

### 6. Authentication Errors

**Error:** Login fails or "Invalid credentials" message

**Solution:**

1. Make sure you're registered first - go to `/register` and create an account
2. Check that the backend server is running: `npm run server`
3. Verify password is correct (case-sensitive)
4. Check browser console for error messages

### 7. Blank Page or 404 Errors

**Error:** Frontend loads but pages show as blank or not found

**Solution:**

1. Check frontend is running on port 5173:
   ```bash
   curl http://localhost:5173
   ```

2. Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

3. Check browser DevTools Console for JavaScript errors

### 8. White Page on Login/Register

**Error:** Forms don't load or are completely blank

**Solution:**

1. Verify CSS file is being loaded properly
2. Check browser DevTools for CSS errors
3. Clear browser cache and restart

### 9. Database Locked Error

**Error:** `Error: SQLITE_BUSY: database is locked`

**Solution:**

This happens when multiple processes try to access the database. 

1. Kill any existing server process (see solution #1)
2. Restart with fresh connection:
   ```bash
   npm run server
   ```

### 10. Node Version Issues

**Error:** `Error: Cannot use import statement outside a module`

**Solution:**

Make sure you're using Node.js v16 or higher:

```bash
node --version
```

If you're on an older version, upgrade Node.js from https://nodejs.org/

## Debugging Tips

### Enable Debug Logging

Backend logs are printed to console automatically.

### Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Try logging in
4. Check if requests go to `http://localhost:3000/api/auth/login`
5. Look at response status and body for errors

### Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for JavaScript errors or warnings
4. Check for network errors (red messages)

### Check Server Logs

Watch the terminal where you ran `npm run dev` for server logs.

## Still Having Issues?

1. **Check the logs** - Both browser console and server terminal
2. **Verify ports** - 3000 (backend) and 5173 (frontend) should be open
3. **Check .env file** - Should have `VITE_API_URL=http://localhost:3000`
4. **Restart everything** - Kill all processes and start fresh
5. **Clear cache** - Browser cache, node_modules, etc.

For more help, check the main `readme.md` file.
