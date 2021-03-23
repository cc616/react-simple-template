const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'production',
  // devtool: 'source-map',
  output: {
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: true,
              localIdentName: '[fullhash:base64:8]'
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_debugger: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash:8].css',
      chunkFilename: 'css/[id].[fullhash:8].css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ]
})
