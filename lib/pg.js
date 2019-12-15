'use strict';

const assert = require('assert');
const { Pool } = require('pg');

module.exports = app => {
  app.addSingleton('pg', createOneClient);
};

function createOneClient(config, app) {
  const { host, port, user, database } = config;
  assert(host && port && user && database,
    `[egg-pg] 'host: ${host}', 'port: ${port}', 'user: ${user}', 'database: ${database}' are required on config`);

  app.coreLogger.info('[egg-pg] connecting %s@%s:%s/%s', user, host, port, database);
  const pool = new Pool(config);

  app.beforeStart(async () => {
    const { rows } = await pool.query('SELECT 1 + 1 AS result');
    assert(rows[0].result === 2);
    app.coreLogger.info('[egg-pg] init instance success');
  });

  return pool;
}
