const request = require('supertest');
const baseURL = 'https://team-project-cse-341.onrender.com';

describe('Directors API', () => {
    it('should return all directors', async () => {
        const res = await request(baseURL).get('/directors');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return a single director by ID', async () => {
        const directorId = '67f215ed01a6bf0d48aa47e7'; 
        const res = await request(baseURL).get(`/directors/${directorId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name');
    });

});
