const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({ filename :'bundle.css'})

module.exports = function (env) { 
    return {
        entry: [
            'react-hot-loader/patch',
            // activate HMR for React

            'webpack-dev-server/client?http://localhost:8080',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates


            './base/client/index.js'
            // the entry point of our app
        ],
        output: {
            filename: 'bundle.js',
            // the output bundle

            path: resolve(__dirname, '../dist'),

            publicPath: '/'
            // necessary for HMR to know where to load the hot update chunks
        },

        context: resolve(__dirname, '../src'),

        devtool: 'inline-source-map',

        devServer: {
            hot: true,
            // enable HMR on the server

            contentBase: resolve(__dirname, '../dist'),
            // match the output path

            publicPath: '/'
            // match the output `publicPath`
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
            new webpack.HotModuleReplacementPlugin(),
            // enable HMR globally

            new webpack.NamedModulesPlugin(),
            // prints more readable module names in the browser console on HMR updates
            
            extractCSS,
        ],

        resolve: {
            alias: {
                'app': resolve(__dirname, '../src/app'),
                'base': resolve(__dirname, '../src/base'),
                'containers': resolve(__dirname, '../src/app/containers')
            }
        }
    } 
};