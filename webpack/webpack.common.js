const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-loadable',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'redux',
      'redux-thunk',
    ],
    app:  './webclient/src/index',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '..', 'webclient', 'dist'),
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.html']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './webclient/index.html'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin("styles.css"),
    new CommonsChunkPlugin({
      names: 'vendor'

    }),
    new CommonsChunkPlugin({
      names: 'common',
      minChunks: 2
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../webclient/static'),
        ignore: ['.*']
      }
    ]),
  ],
  stats: {
    colors: true,
    errors: true,
    version: true,
    warnings: true
  }
};