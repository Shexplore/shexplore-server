'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglifyjs = require('gulp-uglify'),
  rename = require('gulp-rename'),
  uglifycss = require('gulp-uglifycss'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  maps = require('gulp-sourcemaps');

gulp.task('compileStylus', function () {
  return gulp.src('public/stylus/stylesheet.styl')
    .pipe(stylus())
    .pipe(gulp.dest('public/css/'));
});
gulp.task('concatCSS', ['compileStylus'], function () {
  return gulp.src([
        'public/css/stylesheet.css',
        'public/css/normalize.css'])
    .pipe(concat('application.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('public/css/'));
});
gulp.task('minifyCSS', ['concatCSS'], function () {
  return gulp.src('public/css/application.css')
    .pipe(uglifycss())
    .pipe(rename('application.min.css'))
    .pipe(gulp.dest('public/css'));
});
gulp.task('autoprefixCSS', ['minifyCSS'], function () {
  return gulp.src('public/css/application.min.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('processCSS', ['compileStylus', 'concatCSS', 'minifyCSS', 'autoprefixCSS'], function() {})

gulp.task('processJS', function () {
  gulp.src([
        'public/js/plugins/slick/slick.min.js',
        'public/js/main.js',
        'public/js/live.js'])
    .pipe(maps.init())
    .pipe(concat('frontend.js'))
    .pipe(uglifyjs())
    .pipe(rename('frontend.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['processCSS', 'processJS']);