const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

  describe('GET /freeform', () => {
    it('should return an array of freeform critiques', () => {
        return supertest(app)
        .get('/search')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
    })
  });

  describe('POST /freeform/:id', () => {
    it('should return an array of freeform critiques', () => {
        return supertest(app)
        .get('/search')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
    })
  });
  
  describe('GET /template', () => {
    it('should return an array of freeform critiques', () => {
        return supertest(app)
        .get('/search')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
    })
  });

  describe('POST /template/:id', () => {
    it('should return an array of freeform critiques', () => {
        return supertest(app)
        .get('/search')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
    })
  });
  