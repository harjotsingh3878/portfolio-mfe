# Netlify Deployment Guide

## Overview

This micro frontend architecture can be deployed on Netlify with each MFE as a separate site.

## Prerequisites

- Netlify account (free tier works)
- GitHub repository connected to Netlify
- Backend deployed separately (Render, Railway, or Heroku)

## Deployment Steps

### 1. Deploy Backend First

The backend needs to be deployed on a Node.js hosting platform:

**Render.com (Recommended - Free)**
```bash
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - Name: portfolio-mfe-backend
   - Root Directory: backend
   - Build Command: npm install
   - Start Command: node server.js
   - Environment Variables:
     - JWT_SECRET=your-secret-key
     - PORT=4000
5. Click "Create Web Service"
```

**Railway.app**
```bash
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Add environment variables:
   - JWT_SECRET=your-secret-key
5. Deploy!
```

### 2. Create 4 Netlify Sites

You'll create **4 separate Netlify sites** (one for each app):

#### Site 1: Shell App (Main App)
```bash
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose your GitHub repo
4. Configure:
   - Site name: portfolio-mfe-shell
   - Base directory: shell
   - Build command: npm run build
   - Publish directory: shell/dist
   - Environment variables:
     - REACT_APP_API_URL=https://your-backend.onrender.com
     - REACT_APP_TRANSACTIONS_URL=https://portfolio-mfe-transactions.netlify.app
     - REACT_APP_PROFILE_URL=https://portfolio-mfe-profile.netlify.app
     - REACT_APP_NOTIFICATIONS_URL=https://portfolio-mfe-notifications.netlify.app
5. Deploy!
```

#### Site 2: Transactions MFE
```bash
1. Add new site
2. Configure:
   - Site name: portfolio-mfe-transactions
   - Base directory: mfe-transactions
   - Build command: npm run build
   - Publish directory: mfe-transactions/dist
3. Deploy!
```

#### Site 3: Profile MFE
```bash
1. Add new site
2. Configure:
   - Site name: portfolio-mfe-profile
   - Base directory: mfe-profile
   - Build command: npm run build
   - Publish directory: mfe-profile/dist
3. Deploy!
```

#### Site 4: Notifications MFE
```bash
1. Add new site
2. Configure:
   - Site name: portfolio-mfe-notifications
   - Base directory: mfe-notifications
   - Build command: npm run build
   - Publish directory: mfe-notifications/dist
3. Deploy!
```

### 3. Update Webpack Configs for Production

After deploying, update the webpack configs with your actual Netlify URLs:

**shell/webpack.config.js**
```javascript
remotes: {
  transactions: 'transactions@https://portfolio-mfe-transactions.netlify.app/remoteEntry.js',
  profile: 'profile@https://portfolio-mfe-profile.netlify.app/remoteEntry.js',
  notifications: 'notifications@https://portfolio-mfe-notifications.netlify.app/remoteEntry.js',
}
```

Then redeploy all sites.

## Automatic Deployments

Netlify automatically deploys when you push to GitHub. Each site will rebuild only when its folder changes.

## Environment Variables

### Shell App
```
REACT_APP_API_URL=https://your-backend.onrender.com
REACT_APP_TRANSACTIONS_URL=https://portfolio-mfe-transactions.netlify.app
REACT_APP_PROFILE_URL=https://portfolio-mfe-profile.netlify.app
REACT_APP_NOTIFICATIONS_URL=https://portfolio-mfe-notifications.netlify.app
```

### Backend (Render/Railway)
```
JWT_SECRET=your-super-secret-key-here
PORT=4000
NODE_ENV=production
```

## Custom Domains (Optional)

You can add custom domains to each site:
- Shell: `app.yourdomain.com`
- Transactions: `transactions.yourdomain.com`
- Profile: `profile.yourdomain.com`
- Notifications: `notifications.yourdomain.com`

## Troubleshooting

### CORS Errors
Ensure `netlify.toml` has proper CORS headers for remoteEntry.js files.

### Module Federation Not Loading
1. Check all MFE URLs are accessible
2. Verify remoteEntry.js files are being served
3. Check browser console for errors
4. Ensure webpack configs use production URLs

### 404 on Refresh
The `netlify.toml` redirects fix this. Ensure each site has the file.

## Cost

- **Netlify**: Free tier (100GB bandwidth, 300 build minutes/month)
- **Render.com**: Free tier (750 hours/month, sleeps after inactivity)
- **Railway.app**: $5 credit/month free

**Total Cost**: $0 for portfolio/demo projects! 🎉

## Deploy with CLI (Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy shell
cd shell
netlify init
netlify deploy --prod

# Deploy each MFE
cd ../mfe-transactions
netlify init
netlify deploy --prod
```

## Monitoring

- **Netlify Dashboard**: Track deployments and traffic
- **Render Dashboard**: Monitor backend health
- **GitHub Actions**: See build status

## Links After Deployment

Once deployed, you'll have:
- 🏠 Shell: `https://portfolio-mfe-shell.netlify.app`
- 💳 Transactions: `https://portfolio-mfe-transactions.netlify.app`
- 👤 Profile: `https://portfolio-mfe-profile.netlify.app`
- 🔔 Notifications: `https://portfolio-mfe-notifications.netlify.app`
- 🔧 Backend: `https://your-backend.onrender.com`
