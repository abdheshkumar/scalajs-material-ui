'use strict';

var path = require("path");
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const CleanWebPackPlugin = require('clean-webpack-plugin');

module.exports = {

    entry: {
        global: path.resolve(__dirname, './global.js')
    },

    output: {
        path: path.resolve(__dirname,"../ui/apps/scalajs-material-ui"),
        filename: '[name].js'
    },

    devtool: "source-map",

    plugins: [
        //new CleanWebPackPlugin('target/assets'),
        //new CopyWebpackPlugin({ from: path.resolve(__dirname, 'target/assets'), to: 'dest' }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    context: __dirname,
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            path.resolve(__dirname, '../ui/users-app'),
            path.resolve(__dirname, './node_modules'),
            path.resolve(__dirname, '../ui/users-app/node_modules')
        ]
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                loaders: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: false,
                            },
                        },
                    ],
                    publicPath: '../'
                }),
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'image/png',
                            name: 'images/[name].[ext]',
                        }
                    }
                ],
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]',
                        }
                    }
                ],
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/octet-stream',
                            name: 'fonts/[name].[ext]',
                        }
                    }
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'image/svg+xml',
                            name: 'images/[name].[ext]',
                        }
                    }
                ],
            },
        ]
    }
};