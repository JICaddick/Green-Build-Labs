import request from 'supertest';
import app from '../../../src/app';

describe('User Routes', () => {
  it('should get all users', async () => {
    const response = await request(app).get('user/getallusers');
    expect(response.status).toBe(200);
  });
});