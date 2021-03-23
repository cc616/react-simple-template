const path = require('path')

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/app.tsx')
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[fullhash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[fullhash:8].[ext]',
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `${entrypoint.name}.runtime`
    }
  }
}
