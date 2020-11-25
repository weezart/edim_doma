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

gulp.task('bitmap', function () {
    return gulp.src('img/**/*.{png, jpg, jpeg, gif}')
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
        ]))
        .pipe(gulp.dest('img'))
});

gulp.task('svg', function () {
    return gulp.src(['img/**/*.svg', '!img/sprite.svg'])
        .pipe(svgmin())
        .pipe(gulp.dest('img'));
});

gulp.task('sprite', function () {
    return gulp.src('icons/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[opacity]').removeAttr('opacity');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(gulp.dest('img'));
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

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.{scss,sass}', ['styles']);;
});

gulp.task('images', ['bitmap', 'svg', 'sprite']);
gulp.task('dev', ['styles', 'scripts', 'watch']);
gulp.task('build', ['css', 'scripts']);
