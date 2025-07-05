import request from 'supertest';
import app from '../index';

describe('GET /example', () => {
  afterAll((done) => {
    // Close the server after tests are done
    app.close(done);
  });
  it('should return a message', async () => {
    const res = await request(app).get('/example');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('This is a sample endpoint');
  });
});
