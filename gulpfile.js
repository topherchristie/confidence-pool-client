var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./public/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js','./public/app/**/*.js','./*.js'])
    .pipe(jshint({'esversion': '6'}))
  /*  .pipe(notify(function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }));
    //  */   
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('start', ['less','lint'], function () {
  nodemon({
    script: 'app.js',
   // ext: 'js html less',
    tasks: ['less','lint'],
    ignore: [ "node_modules/", "bower_components/"]
  });
});