const mongoose = require('mongoose');

describe('Database Connection', () => {
  beforeAll(async () => {
    // Set environment variables explicitly
    process.env.NODE_ENV = 'test';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/mern_test';
    process.env.JWT_SECRET = 'test-jwt-secret';
    
    // Wait for connection if not already established
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 3000, // 3 second timeout
      });
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be connected to MongoDB', () => {
    // 1 = connected, 2 = connecting
    expect([1, 2]).toContain(mongoose.connection.readyState);
  });

  it('should have test environment variables', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.MONGODB_URI).toBe('mongodb://localhost:27017/mern_test');
    expect(process.env.JWT_SECRET).toBe('test-jwt-secret');
  });
});