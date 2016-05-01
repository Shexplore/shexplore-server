'use strict';

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    stylus = require('gulp-stylus');

gulp.task('compilePug', function() {
  return gulp.src('**.jade')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watchPug', function() {
  gulp.watch('**.jade', ['compilePug']);
});

gulp.task('compileStylus', function() {
  return gulp.src('**.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./'));
});

gulp.task('watchStylus', function() {
  gulp.watch('**.styl', ['compileStylus']);
});

gulp.task('default', ['compilePug', 'compileStylus', 'watchPug', 'watchStylus']);