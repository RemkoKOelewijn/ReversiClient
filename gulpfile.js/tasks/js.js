const {src, dest} = require('gulp');

const fn = function (voornaam) {
    return function () {
        // console.log(`Taak js is uitgevoerd, ${voornaam}!`);
        // return Promise.resolve('Klaar');
    
        return src('js/*.js')
        .pipe(dest('dist'));
    };
};

exports.js = fn;