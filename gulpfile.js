'use strict';
/* jshint node: true */

var gulp = require('gulp');
var gutil = require('gulp-util');

var templateCache = require('gulp-angular-templatecache');
var bower = require('gulp-bower');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var browserify = require('browserify');
var watchify = require('watchify');

var uglify = require('gulp-uglify');

var sourcemaps = require('gulp-sourcemaps');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');



gulp.task('build-partials', function () {
  return gulp.src('dev/js/**/*.html')
    .pipe(templateCache({
        transformUrl : function(url) { return 'js/' + url;},
        standalone : true
    }))
    .pipe(gulp.dest('./dist/js/cache/'));
});

gulp.task('watch-partials', function() {
    return gulp.watch('./dev/js/**/*.html', ['partials']);
});

// Bower
gulp.task('bower', function() {
    return bower();
});


// Copy HTML and CSS
gulp.task('markup', function() {
    return gulp.src('./dev/index.html').pipe(gulp.dest('./dist/'));
});


gulp.task('watch-markup', function() {
    return gulp.watch('./dev/index.html', ['markup']);
});


gulp.task('css', function() {
    return gulp.src('./bower_components/bootstrap-css/css/bootstrap.min.css').pipe(gulp.dest('./dist/css/'));
});

gulp.task('fonts', function() {
    return gulp.src('./bower_components/bootstrap-css/fonts/*.*').pipe(gulp.dest('./dist/fonts/'));
});


gulp.task('browserify', ['build-partials'], function () {
        
    var b = browserify({
        entries: ['./dev/js/app.js'],
    });
    b.transform('debowerify');
    b.on('log', gutil.log);
    b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
//    .pipe(gulpif(debug, sourcemaps.init({loadMaps: true})))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});


gulp.task('watchify', ['build-partials', 'watch-partials'], function () {
        var b = browserify({
            entries: ['./dev/js/app.js'],
            debug: true,
            cache : {},
            packageCache : {},
            verbose: true

        });

        b = watchify(b);
        b.transform('debowerify');

        b.on('update', function() {
            var result = b.bundle()
                .pipe(source('app.js'))
                .pipe(buffer())
            //    .pipe(gulpif(debug, sourcemaps.init({loadMaps: true})))
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist/js/'));
    
            gutil.log('updating...', name);
            return result;
        });
        b.on('log', gutil.log);
        b.on('info', gutil.log);

        return b.bundle()
                .pipe(source('app.js'))
                .pipe(buffer())
            //    .pipe(gulpif(debug, sourcemaps.init({loadMaps: true})))
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist/js/'));
});

gulp.task('browsersync', ['watchify'], function() {

    browserSync({
        open: false,
        port: 8080,
        server: {
            baseDir: './dist'
        }
    });
    
   gulp.watch(['./dist/js/app.js'], reload);
   gulp.watch(['./dist/index.html'], reload);

});


gulp.task('watch', ['bower', 'browsersync', 'markup', 'css', 'fonts','watch-markup']);
gulp.task('default', ['watch']);
gulp.task('build', ['bower', 'browserify', 'markup', 'css', 'fonts']);





