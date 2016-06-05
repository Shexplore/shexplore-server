'use strict';

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    stylus = require('gulp-stylus');

gulp.task('compilePug', function() {
  return gulp.src('**.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watchPug', function() {
  gulp.watch('views/**.pug', ['compilePug']);
});

gulp.task('compileStylus', function() {
  return gulp.src('public/stylus/**.styl')
    .pipe(stylus())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watchStylus', function() {
  gulp.watch('public/stylus/**.styl', ['compileStylus']);
});

gulp.task('default', ['compilePug', 'compileStylus', 'watchPug', 'watchStylus']);