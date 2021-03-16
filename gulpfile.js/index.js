const config = require('./config');
const sass = require('gulp-sass')
const {src, dest, watch, series} = require('gulp');

const js = require('./tasks/js').js(config.localServerProjectPath, config.files.js, config.files.js);
js.displayName = 'js';

const sasstask = require('./tasks/sass').sass(config.localServerProjectPath, config.files.sass);
sass.displayName = 'sass';  

const hello = function (done) {
    console.log(`Groeten van ${config.voornaam}!`)
    done();
}

const scss = function(){
    return src("*.scss")
    .pipe(sass().on('error', sass.logError))   //compile sass
    .pipe(dest("./dist"));
}

const watchFiles = () => {
     watch(['./css/*.scss', './features/**/*.scss'], series(sass));
 }; 

exports.default = hello;
exports.scss = scss;
exports.js = js;
exports.sasstask = sass;
exports.watch = watchFiles;