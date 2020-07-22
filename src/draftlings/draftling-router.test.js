const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /drafting', () => {
    it('should return an draftling/s page', () => {
        return supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
    })
  }); 

  describe('GET /drafting', () => {
    it('should return an draftling/s page', () => {
        return supertest(app)
        .get('/:id')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
    })
  }); 

describe('POST /draftling', () => {
    it('should post a draftling', () => {
        return supertest(app)
        .post('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('object');
        });
    })
})


describe('PUT /draftling', () => {
    it('should return an draftling/s page', () => {
        return supertest(app)
        .put('/:id')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
    })
})