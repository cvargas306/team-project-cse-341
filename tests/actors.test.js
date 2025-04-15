const request = require('supertest');
const baseURL = 'https://team-project-cse-341.onrender.com';

describe('Actors API', () => {
    it('should return all actors', async () => {
        const res = await request(baseURL).get('/actors');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return a single actor by ID', async () => {
        const actorId = '67fb39e9f34f27c580351f20';
        const res = await request(baseURL).get(`/actors/${actorId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name');
    });

});
