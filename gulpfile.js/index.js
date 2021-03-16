const config = require('./config');
const sass = require('gulp-sass')
const {src, dest, watch, series} = require('gulp');

const js = require('./tasks/js').js(config.localServerProjectPath, config.files.js, config.files.js);

const _html = require('./tasks/html').html();

const sassTask = require('./tasks/sass').sass(config.localServerProjectPath, config.files.sass);

const watchFiles = () => {
     watch(['./css/*.scss', './features/**/*.scss'], series(sass));
 }; 

exports.default = series(_html, js, sassTask)
exports.watch = watchFiles