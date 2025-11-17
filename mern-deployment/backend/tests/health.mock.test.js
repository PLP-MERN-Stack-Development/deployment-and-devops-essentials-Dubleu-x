const request = require('supertest');
const createMockServer = require('./mockServer');

describe('Health Check Endpoints (Mock Server)', () => {
  let app;
  
  beforeAll(() => {
    app = createMockServer();
  });
  
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
    expect(res.body.database).toBe('connected');
  });
  
  it('should handle 404 routes', async () => {
    const res = await request(app)
      .get('/api/nonexistent-route')
      .expect(404);
    
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('not found');
  });
});