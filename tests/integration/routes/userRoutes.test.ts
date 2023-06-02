import request from 'supertest';
import app from '../../../src/app';

describe('User Routes', () => {
  it('should respond with a list of users', async () => {
    const response = await request(app).get('/user/getallusers');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Ensure the response is an array

    // Assuming you have at least one user in the response
    const user: {
      id: number;
      email: string;
      password: string;
      created_at: Date;
      role: 'individual' | 'contractor' | 'contractor_team';
    } = response.body[0];

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('role');

    // You can further validate the values or types of the properties if needed
    expect(typeof user.id).toBe('number');
    expect(typeof user.email).toBe('string');
    expect(typeof user.password).toBe('string');
    // expect(user.created_at).toBeInstanceOf(Date);
    expect(['individual', 'contractor', 'contractor_team']).toContain(user.role);

    // Add more assertions...
  });

  // Add more route tests...
});