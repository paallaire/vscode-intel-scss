const config = require('./package.json');

/* --------------------------------------------------------------------------------
    Modules
-------------------------------------------------------------------------------- */
const gulp = require('gulp');
const watch = require('gulp-watch');
const twig = require('gulp-twig');
const del = require('del');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const wait = require('gulp-wait2');

/* --------------------------------------------------------------------------------
    Variables
-------------------------------------------------------------------------------- */

const twigOptions = {
    verbose: true
}

/* --------------------------------------------------------------------------------
    Event OnError
-------------------------------------------------------------------------------- */
const onError = (err) => {

    notify.onError({
        title: "Gulp error in " + err.plugin,
        message: err.toString()
    })(err);

    gutil.beep();

};

/* --------------------------------------------------------------------------------
    Clean
-------------------------------------------------------------------------------- */
gulp.task('clean', () => {

    del([
        config.twig.site.delete,
        config.twig.styleguide.delete
    ]);

});


/* --------------------------------------------------------------------------------
    Watch
-------------------------------------------------------------------------------- */
gulp.task('watch', ['clean', 'build'], () => {

    gulp.watch(config.twig.styleguide.watch, ['watch-sg']);
    gulp.watch(config.twig.site.watch, ['watch-site']);

});

gulp.task('twig-sg', () => {

    return gulp.src(config.twig.styleguide.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(wait(1000))
        .pipe(twig(twigOptions))
        .pipe(gulp.dest(config.twig.styleguide.dest));

});

gulp.task('twig-site', () => {

    return gulp.src(config.twig.site.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(wait(1000))
        .pipe(twig(twigOptions))
        .pipe(gulp.dest(config.twig.site.dest));

});

/* --------------------------------------------------------------------------------
    Build
-------------------------------------------------------------------------------- */
gulp.task('build', ['clean'], () => {

    gulp.start('twig-sg');
    gulp.start('twig-site');

});


/* --------------------------------------------------------------------------------
    Default
-------------------------------------------------------------------------------- */
gulp.task('default', ['clean'], () => {
    gulp.start('build');
});