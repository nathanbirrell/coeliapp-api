// Include gulp
var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('dist', function() {
    return gulp.src(['*','*/**', '!gulpFile.js', '!.*','!loadtest.sh'])
        .pipe(zip('restful-ocr.zip'))
        .pipe(gulp.dest('dist'));
});
