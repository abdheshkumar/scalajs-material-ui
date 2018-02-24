'use strict';

var path = require("path");
var webpack = require('webpack');

//const CleanWebPackPlugin = require('clean-webpack-plugin');

module.exports = {

    entry: {
        global: path.resolve(__dirname, './src/main/resources/global.js')
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

    module: {
        loaders: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },

            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: [{
                    loader: "file-loader"
                }]
            },

            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            query: {
                                limit: '8192'
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                mozjpeg: {
                                    progressive: true
                                },
                                gifsicle: {
                                    interlaced: true
                                },
                                optipng: {
                                    optimizationLevel: 7
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
};