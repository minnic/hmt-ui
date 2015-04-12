var gulp = require('gulp'),
    karma = require('gulp-karma'),
    protractor = require('gulp-protractor').protractor;

gulp.task('default', ['unit']);

gulp.task('unit', function() {
  return gulp.
    src([
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'public/javascripts/main.js',
      'public/javascripts/controller.js',
      'test/unit/test-spec.js'
    ]).
    pipe(karma({
      configFile: 'karma.conf.js',
      // action: 'watch'
    })).
    on('error', function(error) {
      console.log('GULP FILE:');
      console.log(error);
    });
});

gulp.task('e2e', function() {
  return gulp.
    src(['test/e2e/home-spec.js']).
    pipe(protractor({
      configFile: 'protractor.conf.js'
    }));
});