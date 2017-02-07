const { resolve } = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({ filename :'bundle.css'})

module.exports = function (env) {
  return {
      entry: [
           './base/client/index.js'
      ],
      context: resolve(__dirname, '../src'),
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, '../dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },
      module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:4]!postcss-loader",
              })
      },
    ],
  },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        /*new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),*/
        extractCSS
    ],
      resolve: {
            alias: {
                'app': resolve(__dirname, '../src/app'),
                'base': resolve(__dirname, '../src/base'),
                'containers': resolve(__dirname, '../src/app/containers')
            }
        }
  }
}