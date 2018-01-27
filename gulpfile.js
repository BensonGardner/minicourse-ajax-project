// Require modules for minifying images and code

var gulp = require('gulp'), 
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
    git = require('gulp-git'),
    htmlmin = require('gulp-htmlmin');

gulp.task('minify', function() {
  return gulp.src('source/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});
 
gulp.task('minify-css', function() {
  return gulp.src('source/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});
 
gulp.task('compress', function (cb) {
    pump([
        gulp.src('source/**/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
                                                        
// image processing
gulp.task('images', function() {
  var final = 'dist';
  return gulp.src('source/**/*')
    .pipe(imagemin({ optimizationLevel: 7 }))
    .pipe(gulp.dest(final));
});

// Run git commit with options
gulp.task('commit', function(message) {
  return gulp.src('source/**')
    .pipe(git.commit(message, {args: '-A --amend -s'}));
});


gulp.task('default', function(message) {
    ['minify-css', 'compress', 'minify', 'images', 'commit'];
});