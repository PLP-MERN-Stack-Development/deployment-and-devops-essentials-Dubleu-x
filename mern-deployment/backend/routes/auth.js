const express = require('express');
const router = express.Router();

// Mock auth routes for testing
router.post('/register', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { id: '123', email: req.body.email }
  });
});

router.post('/login', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Login successful',
    token: 'mock-jwt-token',
    user: { id: '123', email: req.body.email }
  });
});

router.get('/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;