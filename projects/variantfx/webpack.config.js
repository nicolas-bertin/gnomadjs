const path = require('path')

const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const webpackConfig = {
  devServer: {
    clientLogLevel: 'none',
    contentBase: 'public',
    historyApiFallback: true,
    port: 8008,
    publicPath: '/static/js',
  },
  devtool: 'source-map',
  entry: {
    bundle: isDev
      ? ['babel-polyfill', 'react-hot-loader/patch', './src/index.js']
      : ['babel-polyfill', './src/index.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!p-cancelable)/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './public/static/js'),
    publicPath: '/static/js',
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GNOMAD_API_URL': JSON.stringify(
        process.env.GNOMAD_API_URL || 'http://gnomad-api.broadinstitute.org'
      ),
      'process.env.VARIANT_FX_API_URL': JSON.stringify(
        process.env.VARIANT_FX_API_URL || 'http://variantfx.org:4000/graphql'
      ),
    }),
  ],
}

if (!isDev) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        screw_ie8: true,
      },
      debug: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      minimize: true,
    })
  )
}

module.exports = webpackConfig