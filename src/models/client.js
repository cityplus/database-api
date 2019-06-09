/**
 * Client model
 */

'use strict';

const Joi = require('@hapi/joi');

const schema = Joi.object().keys({

    name: Joi.string().required(),
    
});

module.exports = schema;