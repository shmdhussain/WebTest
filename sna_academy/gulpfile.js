var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');


gulp.task('sass', function() {
    return gulp.src(['src/scss/**/*.scss'])
    	.pipe(plumber())
    	.pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
});




gulp.task('watch', gulp.series("sass", function() {
    gulp.watch(['src/scss/**/*.scss'], gulp.series("sass"));
}));




gulp.task('default', gulp.series("sass", function(cb) {
  console.log("task is completed !!!");
  cb();
}));
