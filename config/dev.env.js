'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

console.log("当前环境是：",process.env.NODE_ENV)

module.exports = merge(prodEnv, {
  NODE_ENV: `"${process.env.NODE_ENV}"`
})
