const request = require('supertest');
const baseURL = 'https://team-project-cse-341.onrender.com';

describe('Users API', () => {
    it('should return all users', async () => {
        const res = await request(baseURL).get('/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return a single user by ID', async () => {
        const userId = '67fe02e3529ef515cc3e62e2'; // replace with a valid user ID
        const res = await request(baseURL).get(`/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('email');
      });

});
