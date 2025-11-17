const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const { securityHeaders, limiter } = require('./middleware/securityHeaders');
const errorHandler = require('./middleware/errorHandler');

// Create express app first
const app = express();

// Import route files with error handling
let authRoutes, userRoutes, healthRoutes;
try {
  authRoutes = require('./routes/auth');
  userRoutes = require('./routes/users');
  healthRoutes = require('./routes/health');
} catch (error) {
  console.warn('Route files not found, using mock routes:', error.message);
  // Create simple mock routes if files don't exist
  authRoutes = express.Router();
  userRoutes = express.Router();
  healthRoutes = express.Router();
  
  authRoutes.get('/mock', (req, res) => res.json({ message: 'Auth mock route' }));
  userRoutes.get('/mock', (req, res) => res.json({ message: 'Users mock route' }));
  healthRoutes.get('/', (req, res) => res.json({ message: 'Health mock route' }));
}

// Connect to database
connectDB();

// Security headers
app.use(securityHeaders);
app.use(limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/health', healthRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;