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
      .get('/api/template/`${id}`')
      .expect(200);
  });
});

describe('POST endpoint - critique freeform', () => {
  it('POST / responds with 200', () => {
    return supertest(app)
      .post('/api/draftling/freeform/1')
      .send({critfreeform: "Very interesting story.", draftling_id: "1", opening: "Wow good job!"})
      .expect(201)
  });
});

describe('POST endpoint - critique template', () => {
  it('POST / responds with 200', () => {
    return supertest(app)
      .post('/api/draftling/template/1')
      .send({characters: "Loved the characters.", dialogue: "Witty dialogue!", draftling_id: "1", gramspell: "No issues.", overall: "Great job.", plot: "Great plot!", pov: "Interesting POVs."})
      .expect(201);
  });
});