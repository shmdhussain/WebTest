var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');


gulp.task('sassi', function() {
    return gulp.src(['scss/**/*.scss'])
    	.pipe(plumber())	
    	.pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
});




gulp.task('watch', gulp.series("sassi", function() {
    gulp.watch(['scss/**/*.scss'], gulp.series("sassi"));
}));




gulp.task('default', gulp.series("sassi", function(cb) {
  console.log("task is completed !!!");
  cb();
}));

