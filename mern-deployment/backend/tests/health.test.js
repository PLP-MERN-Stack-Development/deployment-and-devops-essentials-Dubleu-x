const request = require('supertest');
const mongoose = require('mongoose');

// We'll create the app inside the test to avoid circular dependencies
let app;

beforeAll(async () => {
  // Set environment variables
  process.env.NODE_ENV = 'test';
  process.env.PORT = '5002'; // Different port to avoid conflicts
  process.env.MONGODB_URI = 'mongodb://localhost:27017/mern_test';
  process.env.JWT_SECRET = 'test-jwt-secret';
  process.env.CLIENT_URL = 'http://localhost:3000';
  
  // Import and create app after setting environment variables
  const express = require('express');
  const cors = require('cors');
  const { securityHeaders, limiter } = require('../middleware/securityHeaders');
  
  app = express();
  
  // Security headers
  app.use(securityHeaders);
  app.use(limiter);
  
  // Body parser
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  
  // CORS
  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }));
  
  // Import routes
  const authRoutes = require('../routes/auth');
  const userRoutes = require('../routes/users');
  const healthRoutes = require('../routes/health');
  
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
  
  // Connect to database
  await require('../config/database')();
});

afterAll(async () => {
  // Close MongoDB connection
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

describe('Health Check Endpoints', () => {
  it('should return basic health status', async () => {
    const res = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('healthy');
    expect(res.body.environment).toBe('test');
  });

  it('should return detailed health information', async () => {
    const res = await request(app)
      .get('/api/health/detailed')
      .expect(200);
    
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('memory');
    expect(['connected', 'disconnected']).toContain(res.body.database);
  });

  it('should handle 404 routes', async () => {
    const res = await request(app)
      .get('/api/nonexistent-route')
      .expect(404);
    
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('not found');
  });
});