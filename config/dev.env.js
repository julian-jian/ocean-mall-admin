'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://app.zhihaiocean.com/admin/api"'
  // BASE_API: '"http://127.0.0.1:8080"'
  // BASE_API: '"http://139.186.153.88:8080"'
})
