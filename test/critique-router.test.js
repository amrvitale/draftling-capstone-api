const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const chai = require('chai');

describe('GET endpoint - critique freeform', () => {
  it('GET / responds with 200', () => {
    return supertest(app)
      .get('/api/freeform/:id')
      .expect(200);
  });
});

describe('GET endpoint - critique template', () => {
  it('GET / responds with 200', () => {
    return supertest(app)
      .get('/api/template/:id')
      .expect(200);
  });
});

describe('POST endpoint - critique freeform', () => {
  it('POST / responds with 200', () => {
    return supertest(app)
      .post('/api/draftling/:id')
      .expect(200);
  });
});

describe('POST endpoint - critique template', () => {
  it('POST / responds with 200', () => {
    return supertest(app)
      .post('/api/draftling/:id')
      .expect(200);
  });
});