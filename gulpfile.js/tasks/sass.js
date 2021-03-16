const {src, dest} = require('gulp');
const gulpSass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

const sass = function (serverProjectPath, files_sass) {
    return function () {
        return src(files_sass)
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(concat('style.min.css'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(rename('style.min.css'))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(dest(serverProjectPath + 'css'))
            .pipe(dest('./dist/css'));
    }
};

exports.sass = sass;  
  