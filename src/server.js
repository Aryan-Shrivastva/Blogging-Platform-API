require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import routes and middleware
const postsRoutes = require('./routes/posts');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Initialize database
require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/posts', postsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Blogging Platform API',
    version: '1.0.0',
    endpoints: {
      'GET /health': 'Health check',
      'GET /posts': 'Get all blog posts (with optional ?term=search)',
      'GET /posts/:id': 'Get a specific blog post',
      'POST /posts': 'Create a new blog post',
      'PUT /posts/:id': 'Update a blog post',
      'DELETE /posts/:id': 'Delete a blog post'
    }
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Blogging Platform API is running on port ${PORT}`);
  console.log(`📝 API Documentation available at http://localhost:${PORT}`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
});