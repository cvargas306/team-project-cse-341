const request = require('supertest');
const baseURL = 'https://team-project-cse-341.onrender.com';

describe('Users API', () => {
    it('should return all users', async () => {
        const res = await request(baseURL).get('/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});
