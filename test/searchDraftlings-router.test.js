const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');

describe('GET /search', () => {
    it('should return an array of draftlings', () => {
        return supertest(app)
        .get('/search')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
    })
  });