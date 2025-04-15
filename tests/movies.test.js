const request = require('supertest');
const baseURL = 'https://team-project-cse-341.onrender.com';

describe('Movies API', () => {
    it('should return all movies', async () => {
        const res = await request(baseURL).get('/movies');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return a single movie by ID', async () => {
        const movieId = '67f2192a01a6bf0d48aa47ee'; // Replace with a valid _id from your database
        const res = await request(baseURL).get(`/movies/${movieId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('title');
    });

});
