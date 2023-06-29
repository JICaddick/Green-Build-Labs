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
    const id = user[0].id;
    const response = await request(app).get(`/user/${id}/getuserbyid`);
    expect(response.status).toBe(200);

  });

  it('should create a new user', async () => {
    const response = await request(app).post('/user/register').send({
      "email": "test@testtest.test",
      "password": "potatoes",
      "role": "contractor_team"
    });
    expect(response.status).toBe(200); // check that the post was successful
    expect(response.body).toBe("New user created with email test@testtest.test");

    const getAllUserResponse = await request(app).get('/user/getallusers');
    user = getAllUserResponse.body;

    expect(getAllUserResponse.status).toBe(200); // check that the record was added to the database
    const registeredUser = user.find((user) =>  user.email === "test@testtest.test");

    expect(registeredUser).toHaveProperty('id');
    expect(registeredUser).toHaveProperty('email');
    expect(registeredUser).toHaveProperty('password');
    expect(registeredUser).toHaveProperty('created_at');
    expect(registeredUser).toHaveProperty('role');
    
  });

  it('should update user info', async () => {
    const userToUpdate = user.find(userObj => userObj.id === 44); // Find the user with ID 44
    const updatedEmail = 'updated@testtest.test';
    const updatedPassword = 'newpassword';
    const updatedRole = 'individual';
  
    const response = await request(app)
      .put(`/user/${userToUpdate.id}/updateuser`)
      .send({
        email: updatedEmail,
        password: updatedPassword,
        role: updatedRole
      });
  
    expect(response.status).toBe(200); // check that the update was successful
  
    const updatedUserResponse = await request(app)
      .get(`/user/${userToUpdate.id}/getuserbyid`);
    const updatedUser = updatedUserResponse.body[0]; // Assuming the response is an array with a single user
  
    expect(updatedUser.email).toBe(updatedEmail);
    expect(updatedUser.password).not.toBe(userToUpdate.password); // check that the password is updated
    expect(updatedUser.role).toBe(updatedRole);
  });

  it('should delete a user', async () => {
    const userToDelete = user.find(userObj => userObj.id === 81); // Find the user with ID X
    const response = await request(app).delete(`/user/${userToDelete.id}/deleteuser`);
    expect(response.status).toBe(200); // check that the delete was successful
    const deletedUserResponse = await request(app).get(`/user/${userToDelete.id}/getuserbyid`);
    expect(deletedUserResponse.status).toBe(400); // check that the user is not found
  });
});
