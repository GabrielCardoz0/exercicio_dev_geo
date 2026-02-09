import request from 'supertest';
import app from '../src/app';

describe('Health Check', () => {
  it('deve retornar status 200 e ok', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 200, message: 'server is running' });
  });
});

