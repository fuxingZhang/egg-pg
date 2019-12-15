'use strict';

const mock = require('egg-mock');

describe('test/egg-pg.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/egg-pg-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET pg success', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, pg')
      .expect(200);
  });
});
