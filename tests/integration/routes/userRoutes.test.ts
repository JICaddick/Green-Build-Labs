import request from 'supertest';
import app from '../../../src/app';

describe('User Routes', () => {
  let user;

  beforeAll(async () => {
    const response = await request(app).get('/user/getallusers');
    user = response.body;
  });

  it('should respond with a list of users', async () => {
    expect(user).toBeInstanceOf(Array);
    expect(user.length).toBeGreaterThan(0);
  
    user.forEach((userObj) => {
      expect(userObj).toHaveProperty('id');
      expect(userObj).toHaveProperty('email');
      expect(userObj).toHaveProperty('password');
      expect(userObj).toHaveProperty('created_at');
      expect(userObj).toHaveProperty('role');
  
      expect(typeof userObj.id).toBe('number');
      expect(typeof userObj.email).toBe('string');
      expect(typeof userObj.password).toBe('string');
      // expect(userObj.created_at).toBeInstanceOf(Date);
      expect(['individual', 'contractor', 'contractor_team']).toContain(userObj.role);
    });
  });
  

  it('should get a user by id', async () => {
    const id = user[0].id
    const response = await request(app).get(`/user/${id}/getuserbyid`);
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body
  });

  it('should create a new user', async () => {
    const response = await request(app).post('/user/register').send({
      "email": "test@testtest.test",
      "password": "potatoes",
      "role": "contractor_team"
    });
    expect(response.status).toBe(200);
    expect(response.body).toBe("New user created with email test@testtest.test");

    const getAllUserResponse = await request(app).get('/user/getallusers');
    user = getAllUserResponse.body;

    expect(getAllUserResponse.status).toBe(200);
    const registeredUser = user.find((user) =>  user.email === "test@testtest.test");

    expect(registeredUser).toHaveProperty('id');
    expect(registeredUser).toHaveProperty('email');
    expect(registeredUser).toHaveProperty('password');
    expect(registeredUser).toHaveProperty('created_at');
    expect(registeredUser).toHaveProperty('role');
    
  });
});
