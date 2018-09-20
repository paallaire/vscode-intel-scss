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

const styleguide = {
    src: [
        './styleguide/templates/pages/**.twig'
    ],
    watch: [
        './styleguide/sg-templates/**/*.twig',
        './styleguide/templates/**/*.twig'
    ],
    dest: './public/styleguide',
    delete: 'public/styleguide/*.html'
}

const site = {
    src: [
        './site/pages/**.twig'
    ],
    watch: [
        './site/**/*.twig'
    ],
    dest: './public/',
    delete: 'public/*.html'
}

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
gulp.task('clean', (done) => {

    del([
        styleguide.delete,
        site.delete
    ]);
    done();

});


/* --------------------------------------------------------------------------------
    Watch
-------------------------------------------------------------------------------- */
gulp.task('watch', ['clean', 'build'], () => {

    gulp.watch(styleguide.watch, ['watch-sg']);
    gulp.watch(site.watch, ['watch-site']);

});

gulp.task('twig-sg', () => {

    return gulp.src(styleguide.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(wait(1000))
        .pipe(twig(twigOptions))
        .pipe(gulp.dest(styleguide.dest));
  
});

gulp.task('twig-site', () => {

    return gulp.src(site.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(wait(1000))
        .pipe(twig(twigOptions))
        .pipe(gulp.dest(site.dest));
  
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


