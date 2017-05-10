var webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    files: [
      { pattern: 'test/**/*.spec.js', watched: false, serverd: true, included: true },
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap'],
    },
    webpack: { // kind of a copy of your webpack config
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      module: webpackConfig.module,
      plugins: webpackConfig.plugins,
    },
    webpackServer: {
      stats: 'errors-only',
    },
    reporters: ['mocha'],
    mochaReporter: {
      colors: {
        warning: 'black',
        error: 'red',
      },
      mochaReporter: {
        showDiff: 'true',
      },
    },
    client: {
      captureConsole: false,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    autoWatchBatchDelay: 1000,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  })
}
