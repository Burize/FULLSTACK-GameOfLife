const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],

    files: [
       
        'node_modules/jquery/dist/jquery.js',
      'test/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*.js': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}