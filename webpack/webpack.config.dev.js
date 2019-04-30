const path = require('path')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: [
    path.resolve(__dirname, '../src/app.tsx')
  ],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/app.js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: '/'
  },
  devServer: {
    host: '0.0.0.0',
    port: '8001',
    contentBase: path.resolve(__dirname, '../build'),
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, "../src/styles"),
      routes: path.resolve(__dirname, "../src/routes"),
      components: path.resolve(__dirname, "../src/components"),
      utils: path.resolve(__dirname, "../src/utils"),
      service: path.resolve(__dirname, "../src/service"),
      constants: path.resolve(__dirname, "../src/constants"),
    },
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.json',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('source-map-loader'),
        enforce: 'pre',
        include: path.resolve(__dirname, "../src"),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
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
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: path.resolve(__dirname, '../src'),
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      tslint: path.resolve(__dirname, '../tslint.json'),
    }),
  ]
}
