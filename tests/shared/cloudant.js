/**
 * Cloudant tests
 */

'use strict';

const mdl = require('../../src/shared/cloudant.js');

describe("cloudant", () => {

    it('should connect to the cloudant server', done => {

        mdl.connect()
            .then(client => {

                return done();
            })
            .catch(done);
    }).timeout(10000);
});