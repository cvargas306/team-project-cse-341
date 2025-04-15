const request = require('supertest');
const baseURL = 'https://team-project-cse-341.onrender.com';

describe('Movies API', () => {
    it('should return all movies', async () => {
        const res = await request(baseURL).get('/movies');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});
