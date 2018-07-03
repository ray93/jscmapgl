'use strict'

const path = require('path')
// const webpack = require('webpack')
let htmlWebpackPlugin = require('html-webpack-plugin')

let plugins = [],
  dev_entry = {
    dev_map: path.resolve(__dirname, '../src/map/test.js'),
    dev_interaction: path.resolve(__dirname, '../src/interaction/test.js'),
  }

plugins.push(new htmlWebpackPlugin({
  filename: `index.html`,
  template: path.resolve(__dirname, '../index.html'),
  inject: 'body',
  title: 'map Components',
  chunks: ['index'],
  // chunksSortMode: 'dependency', // 根据文件依赖顺序来决定 script 的引用顺序
}))

module.exports = {
  plugins,
  entry: dev_entry,
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/interface': {
        target: 'http://localhost',
        pathRewrite: {
          '^/interface': '/interface'
        },
        changeOrigin: true,
        secure: false,
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    useEslint: false,
    showEslintErrorsInOverlay: false,

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    cacheBusting: true,

    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}