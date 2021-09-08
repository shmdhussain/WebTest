var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');




var runSequence = require('run-sequence');





gulp.task('sassi', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('css'))
        
});




gulp.task('watch', ['sassi'], function() {
    gulp.watch('scss/**/*.scss', ['sassi']);
    // Other watchers
    // Reloads the browser whenever HTML or JS files change
});



gulp.task('default', function (callback) {
  runSequence(['sassi', 'watch'],
    callback
  )
});

