'use strict'
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const utils = require('./utils')
var ExtractTextPlugin = require("extract-text-webpack-plugin")


module.exports = {
  entry: {
    JSC_3DMAP: path.resolve(__dirname, '../src/interaction/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: 'jsc_3dmap.min.js',
    library: 'jsc_3dmap',
    libraryTarget: 'umd'
  },
  plugins: [
    new ExtractTextPlugin(utils.assetsPath('../jsc_3dmap.min.css')),
    new webpack.optimize.UglifyJsPlugin({
      // 是否 生成 .map 文件
      sourceMap: false,
      // 是否 不紧凑的输出
      beautify: false,
      // 是否 不删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时是否输出警告  
        warnings: false,
        // 是否 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: false,
        // 不删除 log function
        pure_funcs: ['console.log'],
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  resolve: baseWebpackConfig.resolve,
  module: baseWebpackConfig.module
}