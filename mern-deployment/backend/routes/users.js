const express = require('express');
const router = express.Router();

// Mock user routes for testing
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
    ]
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { 
      id: req.params.id, 
      name: 'John Doe', 
      email: 'john@example.com' 
    }
  });
});

router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: { id: req.params.id, ...req.body }
  });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
});

module.exports = router;