/* istanbul ignore file */

class MockCache {
  constructor(data = {}) {
    this.data = data;
  }

  async get(key) {
    if (!this.data[key]) throw new Error(`key=${key} doesn't exist`);
    return this.data[key];
  }

  async set(key, value) {
    this.data[key] = value;
    return value;
  }
}

module.exports = MockCache;
