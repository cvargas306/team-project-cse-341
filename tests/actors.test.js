const request = require('supertest');
const baseURL = 'https://team-project-cse-341.onrender.com';

describe('Actors API', () => {
    it('should return all actors', async () => {
        const res = await request(baseURL).get('/actors');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});
