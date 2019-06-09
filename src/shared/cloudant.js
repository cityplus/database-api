/**
 * Cloudant client
 */

'use strict';

const Cloudant = require('@cloudant/cloudant');
const env = require('env-var').get;

module.exports.connect = async () => {

    return new Promise((resolve, reject) => {

        console.debug('Connecting to the cloudant server...');

        Cloudant(
            {
                url: env('CITYPLUS_DB_CLOUDANT_URL').required().asUrlString(),
                account: env('CITYPLUS_DB_CLOUDANT_USERNAME').required().asString(),
                password: env('CITYPLUS_DB_CLOUDANT_PASSWORD').required().asString()
            },
            (err, client) => {

                if (err) {

                    console.error('Failed to connect to the cloudant server.', err);

                    return reject(err);
                }

                console.debug('Connected to the cloudant server.');

                const dbName = env('CITYPLUS_DB_CLOUDANT_DB').required().asString();
                console.debug(`Using database ${dbName}...`);

                const db = client.db.use(dbName);

                return resolve({ client, db });
            }
        );
    });
};