/**
 * Gulp build task
 */

'use strict';

const args = require('yargs').argv;
const gulp = require('gulp');

const mkdirp = require('mkdirp');
const path = require('path');
const Async = require('async');
const copy = require('copy');
const fs = require('fs');

const defaultPaths = {
    'src/models/**/*': 'src/models',
    'src/shared/**/*': 'src/shared',
    'package.json': '.',
    'yarn.lock': '.'
};

gulp.task('build', (done) => {

    const outputDir = path.join(__dirname, 'dist');

    const functionPath = path.join('src', 'functions', `${args.functionName}.js`);

    if (!fs.existsSync(functionPath)) {

        console.error('Requested function not found.', functionPath);

        return process.exit(1);
    }

    const paths = {
        [functionPath]: '.',
        ...defaultPaths
    };

    Async.series(
        [
            // make /dist
            cb => mkdirp(outputDir, (err) => cb(err)),

            // copy all required files
            cb => {

                const tasks = [];

                Object.keys(paths).map(source => {

                    tasks.push(
                        cb => ((source, dest) =>

                            Async.series(
                                [
                                    // calculate full dest path
                                    cb => {
                                        dest = path.join(outputDir, dest);

                                        cb();
                                    },

                                    // create directory
                                    cb => mkdirp(dest, cb),

                                    // copy files
                                    cb => copy(source, dest, cb)
                                ],
                                err => cb(err)
                            )

                        )(source, paths[source])
                    );
                });

                // run all copy tasks
                Async.parallel(tasks, cb);
            },

            // copy function entrypoint
            cb => {

                const targetFile = path.join(outputDir, 'index.js');

                Async.series(
                    [
                        // copy function template file
                        cb => fs.copyFile('./templates/function-template.js', targetFile, cb),

                        cb => {

                            try {

                                let content = fs.readFileSync(targetFile).toString();

                                content = content.replace('__PATH_TO_MODULE__', functionPath);

                                content = content.split('\\').join('\\\\');

                                fs.writeFileSync(targetFile, content);

                                return cb();
                            }
                            catch (err) {

                                return cb(err);
                            }
                        }
                    ],
                    cb
                );
            },

            // // copy function entrypoint
            // cb => {

            //     const targetPackageFile = path.resolve(outputDir, 'package.json');

            //     const targetPackage = require(targetPackageFile);

            //     targetPackage.main = './start.js';

            //     delete targetPackage.scripts.debug;
            //     delete targetPackage.scripts.coverage;
            //     delete targetPackage.scripts.test;
            //     delete targetPackage.scripts.build;

            //     delete targetPackage.devDependencies;


            //     const output = JSON.stringify(targetPackage);

            //     fs.writeFile(targetPackageFile, output, cb);
            // }
        ],
        done
    );
});