'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    svgSprite = require('gulp-svg-sprite'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify');



gulp.task('styles', function () {
    return gulp.src('./scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
});

gulp.task('css', function () {
    return gulp.src('./scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
});
gulp.task('scripts', function () {
    return gulp.src(['./js/**/*.js', '!js/**/*.min.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js'))
});

gulp.task('build', ['css', 'scripts']);
