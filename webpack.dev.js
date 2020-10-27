
const webpack = require('webpack')
const path = require('path')
const ChromeReloadPlugin = require('wcer')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const {styleLoaders} = require('./core/tools')
module.exports = merge(baseWebpack, {
  watch: true,
  module: {
    rules: styleLoaders({ sourceMap: false })
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ChromeReloadPlugin({
      port: 9090,
      manifest: path.join(__dirname, 'src', 'manifest.js')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new FriendlyErrorsPlugin()
  ]
})
