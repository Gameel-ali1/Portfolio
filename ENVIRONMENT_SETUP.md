# Environment Variables Setup

This document explains how to set up environment variables for both the frontend and backend of your portfolio project.

## Backend Environment Variables

### Required Variables

1. **MONGODB_URI** - Your MongoDB connection string
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

2. **PORT** (optional) - Server port, defaults to 5000
   ```
   PORT=5000
   ```

3. **NODE_ENV** - Environment mode
   ```
   NODE_ENV=development
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd portfolio-backend
   ```

2. Create a `.env` file:
   ```bash
   node create-env.js
   ```

3. Edit the `.env` file and replace the placeholder values with your actual MongoDB URI and other credentials.

## Frontend Environment Variables

### Required Variables

1. **VITE_API_URL** - Your backend API URL
   ```
   # For development
   VITE_API_URL=http://localhost:5000
   
   # For production (replace with your actual backend URL)
   VITE_API_URL=https://your-backend-domain.vercel.app
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd portfolio-frontend
   ```

2. Create a `.env` file:
   ```bash
   touch .env
   ```

3. Add the following content to `.env`:
   ```
   VITE_API_URL=http://localhost:5000
   ```

## Vercel Deployment

### Backend Deployment

1. In your Vercel dashboard, go to your backend project settings
2. Navigate to the "Environment Variables" section
3. Add the following variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`

### Frontend Deployment

1. In your Vercel dashboard, go to your frontend project settings
2. Navigate to the "Environment Variables" section
3. Add the following variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://your-backend-domain.vercel.app`)

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique passwords for your MongoDB database
- Consider using MongoDB Atlas for production databases
- Use environment-specific variables for different deployment stages

## Troubleshooting

- If the frontend can't connect to the backend, check that `VITE_API_URL` is correctly set
- If the backend can't connect to MongoDB, verify your `MONGODB_URI` is correct
- Make sure CORS is properly configured in your backend for production domains 