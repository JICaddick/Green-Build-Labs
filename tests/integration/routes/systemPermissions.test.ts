import request from 'supertest';
import app from '../../../src/app';

describe('System Permissions Routes', () => {
  let systemPermissions;

  beforeAll(async () => {
    const response = await request(app).get('/system_permissions/getallsystempermissions');
    systemPermissions = response.body;

  });

  it('should respond with a list of users system permissions', async () => {
    expect(systemPermissions).toBeInstanceOf(Object);
  });
});