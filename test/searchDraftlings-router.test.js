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

describe('GET endpoint - search page', () => {
    it('GET / responds with 200', () => {
      return supertest(app)
        .get('/api/search')
        .expect(200);
    });
  });