/**
 * Tests entry point
 */

'use strict';

const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../', '.test.env')
});

describe('shared', () => {

    require('./shared/cloudant.js');
});