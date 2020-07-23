const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const chai = require('chai');

describe('GET endpoint - My Desk', () => {
    it('GET / responds with 200', () => {
      return supertest(app)
        .get('/api/mydesk')
        .expect(200);
    });
  });

  describe('GET endpoint - About', () => {
    it('GET / responds with 200', () => {
      return supertest(app)
        .get('/api/about')
        .expect(200);
    });
  });

  describe('GET endpoint - My Desk', () => {
    it('GET / responds with 200', () => {
      return supertest(app)
        .get('/api/mydesk')
        .expect(200);
    });
  });

  describe('GET endpoint - My Draftlings', () => {
    it('GET / responds with 200', () => {
      return supertest(app)
        .get('/api/mydraftlings')
        .expect(200);
    });
  });

  describe('GET endpoint - Post Draftling page', () => {
    it('GET / responds with 200', () => {
      return supertest(app)
        .get('/api/postdraftling')
        .expect(200);
    });
  });

describe('POST endpoint - draftling', () => {
    it('should post a draftling', () => {
        return supertest(app)
        .post('/api/mydraftlings')
        .expect(200)
        });
    })


describe('PUT /draftling', () => {
    it('should return an draftling/s page', () => {
        return supertest(app)
        .put('/api/edit/:id')
        .expect(200)
        .expect('Content-Type', /json/)
        });
})
