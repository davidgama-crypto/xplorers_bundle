/* istanbul ignore file */

const REDIS_CONF = {
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
};

module.exports = {
  REDIS_CONF,
};
