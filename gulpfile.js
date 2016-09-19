/**
 * Created by kelvinsun on 2016/9/19.
 */
'use strict';

const path = require('path');

const gulp = require('gulp');
const less = require('gulp-less');

const liveReload = require('gulp-livereload');
// const liveServer = require('gulp-live-server');

const dev  = inPath => path.resolve('./dev', inPath),
      dist = inPath => path.resolve('./dist', inPath);

gulp.task('less', () => {
    gulp.src(dev('style/*.less'))
        .pipe(less())
        .pipe(gulp.dest(dist('style')))
        .pipe(liveReload());
});

gulp.task('javascript', () => {
    gulp.src(dev('script/*.js'))
        .pipe(gulp.dest(dist('script')))
        .pipe(liveReload());
});

gulp.task('html', () => {
    gulp.src(dev('*.html'))
        .pipe(gulp.dest(dist('./')))
        .pipe(liveReload());
});

gulp.task('image', () => {
    gulp.src(dev('image/*.*'))
        .pipe(gulp.dest(dist('image')))
        .pipe(liveReload());
});

gulp.task('watch', ['less', 'javascript', 'html'], () => {
    liveReload.listen();

    gulp.watch(dev('style/*.less'), ['less']);
    gulp.watch(dev('script/*.js'), ['javascript']);
    gulp.watch(dev('*.html'), ['html']);
});

gulp.task('dist', ['less', 'javascript', 'html']);