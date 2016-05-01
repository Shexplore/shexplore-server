"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    maps = require('gulp-sourcemaps');

gulp.task("concatScripts", function() {
    return gulp.src([
        'public/js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('frontend.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('public/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("public/js/frontend.js")
    .pipe(uglify())
    .pipe(rename('frontend.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('compileSass', function() {
  return gulp.src("public/stylus/stylesheet.styl")
      .pipe(maps.init())
      .pipe(stylus())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('public/css'));
});

gulp.task('watchStylus', function() {
  gulp.watch('public/stylus/*.stylus', ['compileStylus']);
})

gulp.task("build", ['minifyScripts', 'compileStylus']);

gulp.task("default", ["build"]);