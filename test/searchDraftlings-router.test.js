const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const chai = require('chai');


describe('GET endpoint - search page', () => {
    it('GET / responds with 200', () => {
      return supertest(app)
        .get('/api/search')
        .expect(200);
    });
  });