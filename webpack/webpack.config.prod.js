const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = {
  mode: 'production',
  entry: [
    path.resolve(__dirname, '../src/app.tsx')
  ],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'app.js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: '/'
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
        options: {
          compact: true,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, '../tsconfig.json'),
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
              importLoaders: 2,
              sourceMap: false,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: path.resolve(__dirname, '../src'),
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      tslint: path.resolve(__dirname, '../tslint.json'),
    }),
  ]
}
