const request = require('supertest');
const app = require('../src/index');
const assert = require('assert');

describe('Todo API', () => {
  it('should get all todos', async () => {
    const res = await request(app).get('/todos');
    assert.strictEqual(res.status, 200);
    assert(Array.isArray(res.body));
  });

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ task: 'Test task' });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.task, 'Test task');
  });
});
