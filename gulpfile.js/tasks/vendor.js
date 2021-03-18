const { src,dest } = require("gulp")
const concat = require('gulp-concat')

const vendorTask = function(backendPath, vendorFiles){
    return function() {
        return src(vendorFiles)
            .pipe(concat('vendor.js'))
            .pipe(dest('dist/js'))
            .pipe(dest(backendPath + 'js'));
    }
}

exports.vendorTask = vendorTask