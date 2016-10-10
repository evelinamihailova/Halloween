var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var panini = require('panini');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});
gulp.task('panini', function() {
  gulp.src('pages/**/*.html')
    .pipe(panini({
      root: 'pages/',
      layouts: 'layouts/',
      partials: 'partials/',
      helpers: 'helpers/',
      data: 'data/'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['sass', 'panini'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['./src/{layouts,partials,helpers,data}/**/*'], [panini.refresh]);
});
