import request from 'supertest';
import app from '../index';

describe.skip('GET /', () => {
  afterAll((done) => {
    // Close the server after tests are done
    app.close(done);
  });
  it('should return a message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});
