/**
 * Create a new request
 */

'use strict';

const Async = require('async');
const Joi = require('@hapi/joi');

const db = require('../../shared/db.cloudant.js/index.js');

const schema = require('../../models/request.js');

module.exports.main = async (params) => {

    console.debug('Creating a new request...');

    Async.waterfall(
        [
            // validate params
            cb => {

                console.debug('Validating input parameters...');
                console.debug('Params: ', params);

                const { error } = Joi.validate(params, schema, {
                    presence: "required"
                });

                if (error) {

                    console.error('Validation failed.', error);
                }
                else {

                    console.debug('Validation done!');
                }

                return cb(error);
            },

            // connect to the database
            cb => db.connect().then(({ db }) => cb(null, db)).catch(cb),

            // insert document
            (db, cb) => {

                console.debug('Inserting document into the database...');

                db.insert(
                    ...params, // full-clone
                    (err, result) => {

                        if (err) {

                            console.error('Failed to insert the document', err);

                            return cb(err);
                        }


                    }
                );
            },

            // map the result
            (result, cb) => {

            }
        ],
        (err, result) => {

            if (err) {

                return reject(err);
            }

            console.info('Done! The result is: ', result);

            return resolve(result);
        }
    );
};