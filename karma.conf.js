module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    browsers: ['PhantomJS'],
    reporters: ['progress']
  });
};