var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var del = require('del');

var appDevelopPath = "app/";
var { execFile } = require('child_process');


gulp.task('copyFilesForSNAWebsite', function(cb) {
    cb();
    // return execFile("/Users/Mohamed_Hussain_SH/mylocal/Demo/MyDemoServer/myroot/nodejs_playground/copyUseElectionFromSimpleDemoToSnapProj.sh");
});

gulp.task('copyDistFilesForAppAndZipAndMail', function() {
    return execFile("/Users/Mohamed_Hussain_SH/mylocal/Demo/MyDemoServer/myroot/nodejs_playground/copydistFoldersToAppFolderAndZipAndSendMail.sh");
});



gulp.task('sassi', gulp.series("copyFilesForSNAWebsite", function() {
    return gulp.src(['app/scss/**/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'));
}));




gulp.task('watch', gulp.series("sassi", function() {
    gulp.watch(['app/scss/**/*.scss'], gulp.series("sassi"));
}));




gulp.task('default', gulp.series("sassi", function(cb) {
    console.log("task is completed !!!");
    cb();
}));









/*START: build taks*/


/*START: cleaning tasks*/
gulp.task('clean:ios', async function() {
    await del('distIos');
});
gulp.task('clean:android', async function() {
    await del('distAndroid');
});
gulp.task('clean:web', async function() {
    await del('dist');
});
gulp.task('clean:separateTwoHtmlApp', async function() {
    await del('distSeparateTwoHtmlApp');
});
gulp.task('clean:separateTwoHtmlAppWithNoMinification', async function() {
    await del('distSeparateTwoHtmlAppWithNoMinification');
});
/*END: cleaning tasks*/




gulp.task('build:ios', gulp.series("clean:ios", function() {
    return gulp.src('app/index_ios.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('distIos'));
}));

gulp.task('build:android', gulp.series("clean:android", function() {
    return gulp.src('app/index_android.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('distAndroid'));
}));



gulp.task('build:web', gulp.series("clean:web", function() {
    return gulp.src('app/index_web.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
}));

gulp.task('build:separateTwoHtmlApp', gulp.series("clean:separateTwoHtmlApp", function() {
    return gulp.src(['app/index_app_map.html', 'app/index_app_bottom_result_bar.html'])
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('distSeparateTwoHtmlApp'));
}));

gulp.task('build:separateTwoHtmlAppWithNoMinification', gulp.series("clean:separateTwoHtmlAppWithNoMinification", function() {
    return gulp.src(['app/index_app_map.html', 'app/index_app_bottom_result_bar.html'])
        .pipe(useref())
        // .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('distSeparateTwoHtmlAppWithNoMinification'));
}));

gulp.task('build', gulp.series(
    "sassi",
    "build:web",
    "build:android",
    "build:ios",
    "build:separateTwoHtmlApp",
    "build:separateTwoHtmlAppWithNoMinification",
    "copyFilesForSNAWebsite",
    "copyDistFilesForAppAndZipAndMail"
));

gulp.task('prepEmailtoAppDev', function(cb) {

});


/*END: build taks*/