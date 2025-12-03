# Portfolio MFE (Micro Frontend)

A modern micro frontend architecture using Module Federation with React, Redux, and Webpack.

## Project Structure

```
portfolio-mfe/
├── shell/                 # Main shell application (host)
├── mfe-notifications/     # Notifications micro frontend
├── mfe-profile/          # Profile micro frontend
├── mfe-transactions/     # Transactions micro frontend
├── backend/              # Backend server
└── shared/               # Shared utilities and constants
```

## Features

- **Module Federation**: Seamless integration of micro frontends
- **Shared Dependencies**: React, React DOM, and Redux are shared across all modules
- **Authentication**: Protected routes with auth state management
- **Theme Management**: Context-based theme switching
- **Responsive Design**: Mobile-friendly UI components
- **Redux State Management**: Centralized store with auth and feature flags

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

Install dependencies for all modules:

```bash
# Shell application
cd shell
npm install

# Micro frontends
cd ../mfe-notifications && npm install
cd ../mfe-profile && npm install
cd ../mfe-transactions && npm install

# Backend
cd ../backend && npm install
```

## Development

### Step 1: Install Dependencies

```bash
# Install dependencies for all modules
cd /path/to/portfolio-mfe

# Shell application
cd shell
npm install
cd ..

# Micro frontends
cd mfe-notifications && npm install && cd ..
cd mfe-profile && npm install && cd ..
cd mfe-transactions && npm install && cd ..

# Backend
cd backend && npm install && cd ..
```

### Step 2: Start the Services

You need to start all services in separate terminal windows/tabs. The order matters - start backend first, then the MFEs, and finally the shell.

#### Terminal 1: Start Backend (Port 4000)
```bash
cd backend
npm start
```
Expected output: `Backend running on http://localhost:4000`

#### Terminal 2: Start Transactions MFE (Port 3001)
```bash
cd mfe-transactions
npm start
```
Expected output: Webpack dev server running on `http://localhost:3001`

#### Terminal 3: Start Profile MFE (Port 3002)
```bash
cd mfe-profile
npm start
```
Expected output: Webpack dev server running on `http://localhost:3002`

#### Terminal 4: Start Notifications MFE (Port 3003)
```bash
cd mfe-notifications
npm start
```
Expected output: Webpack dev server running on `http://localhost:3003`

#### Terminal 5: Start Shell Application (Port 3000)
```bash
cd shell
npm start
```
Expected output: Webpack dev server running on `http://localhost:3000`

### Step 3: Access the Application

Open your browser and navigate to: **http://localhost:3000**

### Step 4: Login

Use the demo credentials to login:
- **Email**: `admin@example.com`
- **Password**: `admin123`

Or try:
- **Email**: `user@example.com`
- **Password**: `user123`

### Running All Services at Once (Quick Start)

If you want to run all services with a single command:

```bash
# Terminal 1
cd backend && npm start &

# Terminal 2 (or in parallel)
cd mfe-transactions && npm start &

# Terminal 3 (or in parallel)
cd mfe-profile && npm start &

# Terminal 4 (or in parallel)
cd mfe-notifications && npm start &

# Terminal 5 (or in parallel)
cd shell && npm start
```

### Services Overview

| Service | Port | URL | Status |
|---------|------|-----|--------|
| Shell (Host) | 3000 | http://localhost:3000 | Main application |
| Transactions MFE | 3001 | http://localhost:3001 | Remote module |
| Profile MFE | 3002 | http://localhost:3002 | Remote module |
| Notifications MFE | 3003 | http://localhost:3003 | Remote module |
| Backend API | 4000 | http://localhost:4000 | API server |

## Build

Build all modules for production:

```bash
# Shell
cd shell
npm run build

# Micro frontends
cd ../mfe-notifications && npm run build
cd ../mfe-profile && npm run build
cd ../mfe-transactions && npm run build
```

## Available Routes

- `/` - Dashboard (requires authentication)
- `/login` - Login page
- `/profile` - Profile micro frontend
- `/transactions` - Transactions micro frontend
- `/notifications` - Notifications micro frontend

## Module Federation Configuration

Each module is configured with Module Federation:

- **Shell**: Host application that loads remote modules
- **Micro Frontends**: Expose their App component as `./App` or `./NotificationsApp`

Remote modules are loaded from:
- Transactions: `http://localhost:3001/remoteEntry.js`
- Profile: `http://localhost:3002/remoteEntry.js`
- Notifications: `http://localhost:3003/remoteEntry.js`

## State Management

### Redux Store
Located in `shell/src/store/`:
- `authSlice.js` - Authentication state
- `themeSlice.js` - Theme preferences
- `featureFlagsSlice.js` - Feature flags

### Context API
- `ThemeContext.js` - Theme provider and hook

## Styling

- Global styles: `shell/src/styles/global.css`
- Component styles:
  - `dashboard.css` - Dashboard layout
  - `layout.css` - Main layout
  - `login.css` - Login page

## Environment Variables

Create `.env` files in each application root:

```bash
REACT_APP_API_URL=http://localhost:5000
```

## Troubleshooting

### Port Already in Use

If you get an `EADDRINUSE` error, it means the port is already in use. Kill the process using the port:

**macOS/Linux:**
```bash
# Kill process on specific port
lsof -i :3000  # Check what's using port 3000
kill -9 <PID>  # Kill the process

# Or kill all node processes
killall node
```

**Windows:**
```bash
# Find process using port
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

Alternatively, change the port in `webpack.config.js`:
```javascript
devServer: {
  port: 3000,  // Change this to any available port
  historyApiFallback: true,
}
```

### Blank Page or Nothing Loading

1. **Check all services are running**: Open developer console (F12) and check for errors
2. **Hard refresh**: Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows/Linux)
3. **Clear cache**: Delete `.webpack` and `node_modules/.cache` folders
4. **Check terminal output**: Look for compilation errors in terminal windows

### Module Sharing Error: "Shared module is not available for eager consumption"

This error is fixed by the async bootstrap pattern. If you still see it:
1. Ensure all `webpack.config.js` files have `eager: false` in shared modules
2. Verify all apps have bootstrap.js files
3. Restart all servers (kill and restart npm start)

### Module Resolution Errors

**Error**: `Can't resolve '@module'`

Solutions:
1. Ensure all micro frontends are running before accessing them from shell
2. Run `npm install` in the module that has the missing dependency
3. Check `shared` section in `webpack.config.js` includes the module

### Login Not Working

1. Ensure backend is running on `http://localhost:4000`
2. Check browser console for error messages
3. Verify credentials:
   - Email: `admin@example.com`, Password: `admin123`
   - Email: `user@example.com`, Password: `user123`

### Network Errors When Accessing Remote Modules

1. Verify all MFEs are running on their assigned ports
2. Check webpack.config.js remotes configuration matches your running services:
   ```javascript
   remotes: {
     transactions: 'transactions@http://localhost:3001/remoteEntry.js',
     profile: 'profile@http://localhost:3002/remoteEntry.js',
     notifications: 'notifications@http://localhost:3003/remoteEntry.js',
   }
   ```
3. Open each port in browser to verify it's accessible (e.g., http://localhost:3001)

### Styles Not Loading

1. Ensure `style-loader` and `css-loader` are installed: `npm install`
2. Check webpack config has CSS rules configured
3. Verify CSS file imports are correct in your components

### Hot Module Replacement (HMR) Not Working

The webpack dev servers support HMR. If changes aren't reflecting:
1. Hard refresh the browser
2. Restart the relevant npm start command
3. Check webpack dev server is running without compilation errors

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `EADDRINUSE` error | Kill process on port or change port in webpack.config.js |
| Blank page | Hard refresh (Cmd+Shift+R), check console for errors |
| Module not found | Run npm install, ensure MFE is running |
| API calls failing | Verify backend is running on port 4000 |
| Styles not applied | Check CSS files exist, run npm install |
| Login fails | Check credentials, verify backend is running |

## Troubleshooting

## Technologies Used

- React 18.2.0
- Redux Toolkit 2.0.1
- Webpack 5.89.0
- Babel 7.23.6
- React Router 6.20.0
- Module Federation

## License

MIT
