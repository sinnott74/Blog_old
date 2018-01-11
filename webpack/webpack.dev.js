const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'webclient', 'dist'),
    hot: true,
    compress: true,
    historyApiFallback: true,
    port: 8081,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8081',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
});