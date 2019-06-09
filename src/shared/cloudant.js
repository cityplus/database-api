/**
 * Cloudant client
 */

'use strict';

const Cloudant = require('@cloudant/cloudant');
const env = require("env-var").get;

module.exports.connect = async () => {

    return new Promise((resolve, reject) => {

        console.debug("Connecting to the cloudant server...");

        Cloudant(
            {
                account: env("CITYPLUS_DB_CLOUDANT_ACCOUNT").required().asString(),
                password: env("CITYPLUS_DB_CLOUDANT_PASSWORD").required().asString()
            },
            (err, client) => {

                if (err) {

                    console.error("Failed to connect to the cloudant server.", err);

                    return reject(err);
                }

                console.debug("Connected to the cloudant server.");

                return resolve(client);
            }
        );
    });
};