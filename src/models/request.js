/**
 * Request
 */

'use strict';

const schema = Joi.object().keys({

    channel: Joi.object().keys({

        // The channel that the input received via
        name: Joi.string().required().choices(['watson']),

        // Channel metadata
        meta: Joi.object()
    }),

    // Input metadata
    meta: Joi.object(),

    // raw data
    raw: Joi.object()
});

module.exports = schema;