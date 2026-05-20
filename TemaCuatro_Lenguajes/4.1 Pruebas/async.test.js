// async.test.js
const fetchData = require('./fetchData');

test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData(true)).rejects.toMatch('error'); // ← true para que rechace
});