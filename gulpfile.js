var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var bowerFiles = require('gulp-bower-files');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var stylish = require('jshint-stylish');


var paths = {
  bowerCopy: {
    dest: 'app/assets/components'
  },

  scripts: {
    src: [
      'src/components/angular/angular.js',
      'src/components/angular-route/angular-route.js',
      'src/js/app.js',
      'src/js/**/*.js'
    ],
    fullDir: 'app/assets/js/scripts.js',
    dir: 'app/assets/js',
    dest: 'scripts.js',
    jsHint: [
      'src/js/app.js',
      'src/js/**/*.js'
    ]
  },
  images: {
    src: 'app/assets/img/**/*',
    dest: 'app/assets/img'
  },

  scss: {
    src: 'src/scss/style.scss',
    dest: 'app/assets/css'
  },

  watch: {
    styles: [
      'src/scss/style.scss',
      'src/scss/**/*.scss'
    ],
    js: [
      'src/js/app.js',
      'src/js/**/*.js'
    ]
  }
};


/**
 * Stylesheets tasks
 */
gulp.task('styles', function () {
  gulp.src(paths.watch.styles)
    .pipe(watch(function (files) {
      return gulp.src(paths.scss.src).pipe(sass())
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.scss.dest));
    }));

});

/**
 * Stylesheets one time task
 */
gulp.task('styles-one-time', function () {
  return gulp.src(paths.scss.src).pipe(sass())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.scss.dest));
});

/**
 * Javascript tasks
 */
gulp.task('js', function () {
  gulp.src(paths.watch.js)
    .pipe(watch(function (files) {
      gulp.src(paths.scripts.src)
        .pipe(concat(paths.scripts.dest))
        .pipe(gulp.dest(paths.scripts.dir));

      gulp.src(paths.scripts.fullDir)
        .pipe(uglify({outSourceMap: false}))
        .pipe(concat("scripts.min.js"))
        .pipe(gulp.dest(paths.scripts.dir));
    }));
});


/**
 * Javascript one time tasks
 */
gulp.task('js-one-time', function () {
  gulp.src(paths.scripts.src)
    .pipe(concat(paths.scripts.dest))
    .pipe(gulp.dest(paths.scripts.dir));

  gulp.src(paths.scripts.fullDir)
    .pipe(uglify({outSourceMap: false}))
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest(paths.scripts.dir));
});

/**
 * Imagemin task
 */
gulp.task('images', function () {
  return gulp.src(paths.images.src)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.images.dest));
});

/**
 * JSHint task
 */
gulp.task('lint', function () {
  gulp.src(paths.scripts.jsHint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

/**
 * Bower task
 */
gulp.task('bowerFiles', function () {
  bowerFiles().pipe(gulp.dest(paths.bowerCopy.dest))
});

gulp.task('default', ['styles', 'js']);

gulp.task('prod', ['styles-one-time', 'js-one-time', 'images', 'lint']);