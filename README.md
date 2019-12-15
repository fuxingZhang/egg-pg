# egg-pg

[PostgreSQL](https://github.com/brianc/node-postgres) plugin for Egg.js

> NOTE: This plugin just for integrate pg into Egg.js, more documentation please visit https://node-postgres.com/.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@eggplugin/pg.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@eggplugin/pg
[travis-image]: https://img.shields.io/travis/eggjs/@eggplugin/pg.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/@eggplugin/pg
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/@eggplugin/pg.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/@eggplugin/pg?branch=master
[david-image]: https://img.shields.io/david/eggjs/@eggplugin/pg.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/@eggplugin/pg
[snyk-image]: https://snyk.io/test/npm/@eggplugin/pg/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@eggplugin/pg
[download-image]: https://img.shields.io/npm/dm/@eggplugin/pg.svg?style=flat-square
[download-url]: https://npmjs.org/package/@eggplugin/pg

## Install

```bash
$ npm i @eggplugin/pg --save
```

## Configuration

```js
// {app_root}/config/plugin.js
exports.pg = {
  enable: true,
  package: '@eggplugin/pg',
};
```
see [config/config.default.js](config/config.default.js) for more detail.

### Simple database instance

```js
// {app_root}/config/config.default.js
exports.pg = {
  client: {
    user: '',
    host: '',
    database: '',
    password: ''
    // ...
  },
  // load into app, default is open
  app: true,
  // load into agent, default is close
  agent: false,
};
```

Usage:

```js
(async () => {
  // you can access to pool instance using app.pg.
  const pool = app.pg;
  // check out a client
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users WHERE id = $1', [1]);
    console.log(res.rows[0]);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
  // Single query
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [1]);
  console.log('user:', rows[0]);
  
}).catch(console.error);
```

### Multiple database instance

```js
exports.pg = {
  // default configuration for all clients
  default: {
    port: 5432,
    max: 5,
    // ...
  },
  clients: {
    // clientId, access the client instance by app.pg.get('clientId')
    db1: {
      user: '',
      host: '',
      database: '',
      password: ''
    // ...
    },
    db2: {
      user: '',
      host: '',
      database: '',
      password: ''
      // ...
    },
    // ...
  },
  // load into app, default is open
  app: true,
  // load into agent, default is close
  agent: false,
};
```

Usage:

```js
(async () => {
  const pool1 = app.pg.get('db1'); 
  const pool2 = app.pg.get('db2'); 
  // Single query
  const result1 = await pool1.query('SELECT NOW()');
  const result2 = await pool2.query('SELECT NOW()');
  // check out a client
  const client1 = await pool1.connect();
  const client2 = await pool2.connect();
}).catch(console.error);
```

## Questions & Suggestions

Please open an issue [here](https://github.com/fuxingZhang/egg-pg/issues).

## License

[MIT](LICENSE)