'use strict';

/**
 * egg-pg default config
 * @member Config#pg
 */
exports.pg = {
  // default configuration for all clients
  default: {
    port: 5432,
    max: 5,
  },
  app: true,
  agent: false,

  // Single client
  // client: {
  //   user: '',
  //   host: '',
  //   database: '',
  //   password: ''
  //   // ...
  // },

  // Multi client
  // clients: {
  //   client1: {
  //     user: '',
  //     host: '',
  //     database: '',
  //     password: ''
  //     // ...
  //   },
  //   client2: {
  //     user: '',
  //     host: '',
  //     database: '',
  //     password: ''
  //     // ...
  //   },
  // },
};
