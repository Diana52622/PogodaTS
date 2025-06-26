import request from 'supertest';
import app from '../index.js';

describe('Weather API', () => {
  it('GET /weather - should require city parameter', async () => {
    const response = await request(app).get('/weather');
    expect(response.status).toBe(400);
  });

  it('GET /weather - should return data for valid city', async () => {
  const response = await request(app).get('/weather?city=Moscow');
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('city');
  expect(response.body).toHaveProperty('temperature');
  expect(response.body).toHaveProperty('meme');
});
});


describe('POST /memes', () => {
it('should validate category', async () => {
      const response = await request(app)
        .post('/memes')
        .send({
          category: 'invalid',
          image: 'img.jpg',
          text: 'Text'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid category');
    });
  });