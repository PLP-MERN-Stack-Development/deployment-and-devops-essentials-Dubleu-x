module.exports = () => {
  // Set global test environment variables
  process.env.NODE_ENV = 'test';
  process.env.PORT = '5001';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/mern_test';
  process.env.JWT_SECRET = 'test-jwt-secret';
  process.env.CLIENT_URL = 'http://localhost:3000';
  
  console.log('Test environment variables set');
};