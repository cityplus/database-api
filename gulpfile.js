/**
 * Gulp build task
 */

'use strict';

const gulp = require('gulp');
const args = require('yargs').argv;

gulp.task('build', () => {

    console.log(args.test);

});