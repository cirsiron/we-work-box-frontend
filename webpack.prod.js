const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const {styleLoaders} = require('./core/tools')
module.exports = merge(baseWebpack, {
  devtool: 'none',
  module: {
    rules: styleLoaders({ extract: true, sourceMap: true })
  },
  plugins: [
    new CleanWebpackPlugin(['build/*.*'], {
      verbose: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
})
