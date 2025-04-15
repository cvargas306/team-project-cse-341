const request = require('supertest');
const baseURL = 'https://team-project-cse-341.onrender.com';

describe('Directors API', () => {
    it('should return all directors', async () => {
        const res = await request(baseURL).get('/directors');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});
