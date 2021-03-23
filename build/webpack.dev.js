const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: '8001',
    hot: true,
    open: true,
    publicPath: '/',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]_[hash:base64:8]'
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              // modifyVars: { '@primary-color': '#1890ff' },
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ]
})
