# Deployment Guide

This project is structured as a monorepo with both frontend and backend in the same repository.

## Project Structure

```
Portfolio/
├── src/                    # Frontend source code (moved from portfolio-frontend/)
├── public/                 # Frontend public assets
├── portfolio-backend/      # Backend API code
├── package.json           # Frontend dependencies and scripts
├── vite.config.js         # Vite configuration
├── vercel.json           # Vercel deployment configuration
└── README.md
```

## Deployment Setup

### Frontend Deployment (Vercel)

The frontend is configured to build from the root directory:

1. **Build Command**: `npm install && npm run build`
2. **Output Directory**: `dist`
3. **Framework**: Vite

### Backend Deployment (Vercel Functions)

The backend is deployed as serverless functions:

1. **Function Path**: `portfolio-backend/api/index.js`
2. **Runtime**: Node.js 18.x
3. **API Routes**: All `/api/*` requests are routed to the backend

## Environment Variables

### Frontend Environment Variables
- `VITE_API_URL`: Your backend API URL

### Backend Environment Variables  
- `MONGODB_URI`: Your MongoDB connection string
- `NODE_ENV`: Set to `production` for deployment

## Local Development

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd portfolio-backend
npm install
node create-env.js
# Edit .env file with your MongoDB URI
npm start
```

## Vercel Configuration

The `vercel.json` file handles:
- Frontend build and output
- API route rewrites to backend functions
- Serverless function configuration

## Troubleshooting

1. **Build fails**: Make sure all dependencies are in the root `package.json`
2. **API not working**: Check that environment variables are set in Vercel dashboard
3. **CORS issues**: Backend CORS is configured for production domains 