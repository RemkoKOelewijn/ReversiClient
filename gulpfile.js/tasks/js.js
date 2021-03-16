const {src, dest} = require('gulp');
const concat = require('gulp-concat');
const order = require('gulp-order');
const babel = require('gulp-babel')
const uglify = require('gulp-uglifyjs')

const jstask = function (backendPath, filesJs, filesJsOrder) {
    return function () {    
        return src(filesJs)
            .pipe(order(filesJsOrder, {base: './'}))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(uglify({compress: true}))
            .pipe(dest('./dist/js'))
            .pipe(dest(backendPath + '/dist/js'));
    };
};


exports.js = jstask;