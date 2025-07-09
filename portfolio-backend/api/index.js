const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const writeupRoutes = require('./routes/writeupRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.warn('MONGODB_URI not found in environment variables. Please create a .env file with MONGODB_URI.');
}

// Routes
app.use('/api', writeupRoutes);

// Health check endpoint (useful for Vercel)
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  let port = process.env.PORT || 5000;
  const server = app.listen(port)
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}...`);
        port += 1;
        server.listen(port);
      } else {
        console.error('Server error:', err);
      }
    })
    .on('listening', () => {
      console.log(`Server running on port ${port}`);
    });
}

// For Vercel serverless deployment
module.exports = app; 