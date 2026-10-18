const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');
const db = require('../src/quota/db');

describe('Portfolio-App Backend Integration Smoke Tests', () => {
  let server;
  let baseUrl;

  before(async () => {
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
    db.close();
  });

  test('GET /api/health returns 200 and status ok', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'ok');
    assert.ok(body.timestamp, 'timestamp should be present');
  });

  test('POST /api/contact validates required fields (rejects empty body)', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.ok(body.error, 'error field should be present');
  });

  test('POST /api/contact rejects invalid email address', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'invalid-email-format',
        mobileNumber: '1234567890',
        subject: 'Inquiry',
        message: 'Hello!',
      }),
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error, 'Invalid email address.');
  });

  test('GET /api/cv responds without unhandled exception', async () => {
    const res = await fetch(`${baseUrl}/api/cv`);
    // Depending on whether valid R2 credentials exist in .env, status is 200 or 500
    assert.ok([200, 500].includes(res.status), `Expected 200 or 500, got ${res.status}`);
    const body = await res.json();
    if (res.status === 200) {
      assert.ok(body.url, 'Signed URL should be present');
    } else {
      assert.ok(body.error, 'Error message should be present');
    }
  });

  test('GET /api/unknown-route returns 404', async () => {
    const res = await fetch(`${baseUrl}/api/unknown-route`);
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.equal(body.error, 'Not found');
  });

  test('SQLite database initializes tables and handles queries', () => {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    const tableNames = tables.map((t) => t.name);
    assert.ok(tableNames.includes('daily_quota'), 'daily_quota table must exist');
    assert.ok(tableNames.includes('ip_sessions'), 'ip_sessions table must exist');
  });
});
