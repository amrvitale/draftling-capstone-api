const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const chai = require('chai');
const knex = require('knex');

const { DATABASE_URL } = require('../src/config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

app.set('db', db);

describe('GET endpoint - Welcome', () => {
    it('GET / responds with 200', () => {
      return supertest(app)
        .get('/api/')
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
        .send({title: "Hello world", wordcount: "Six word story",content: "It's beautiful here.",genre: "Action/Adventure", modified: "2020-07-23T07:30:32.173Z"})
        .expect(201)
        });
    })
describe('PUT /draftling', () => {
    it('should edit a draftling', () => {
        return supertest(app)
        .put('/api/mydraftlings/1')
        .send({title: "Hello world", wordcount: "Six word story",content: "It's beautiful here.",genre: "Action/Adventure", modified: "2020-07-23T07:30:32.173Z"})
        .expect(204)
        });
})
