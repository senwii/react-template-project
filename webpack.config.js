const webpackBase = require('./webpack/webpack.base')

let webpackEnv = {}

switch (process.env.NODE_ENV) {
  case 'develop':
    webpackEnv = require('./webpack/webpack.dev')
    break
  case 'product':
    webpackEnv = require('./webpack/webpack.prod')
    break
}

module.exports = {
  ...webpackBase,
  ...webpackEnv,
}
