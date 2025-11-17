const mongoose = require('mongoose');

// Skip these tests if MongoDB isn't available
const describeIfMongo = process.env.SKIP_MONGO_TESTS ? describe.skip : describe;

describeIfMongo('Database Connection (Skippable)', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 3000,
      });
    } catch (error) {
      // Skip tests if connection fails
      console.log('Skipping database tests - MongoDB not available');
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  it('should be connected to MongoDB', () => {
    if (mongoose.connection.readyState === 0) {
      console.log('Skipping test - MongoDB not connected');
      return;
    }
    expect(mongoose.connection.readyState).toBe(1);
  });
});