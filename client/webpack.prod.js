'use strict';

var path = require("path");
var webpack = require('webpack');

const ClosureCompilerPlugin = require('webpack-closure-compiler');

var WebpackOnBuildPlugin = require('on-build-webpack');

var ClosureCompiler = require('google-closure-compiler').compiler;

var module_name = "ngage.client.apps.service-management-app";


const WebpackShellPlugin = require('webpack-shell-plugin');

//const CleanWebPackPlugin = require('clean-webpack-plugin');

//console.log(path.resolve(__dirname,"../../web_servers/static/apps/ngage.client.apps.service-management-app"))

module.exports = {

    entry: {
        global: path.resolve(__dirname, './src/main/resources/global.js')
    },

    output: {
        path: path.resolve(__dirname, "./target/scala-2.12"),
        filename: '[name]-webpack.js'
    },

    /*devtool: "nosources-source-map",*/

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })/*,
        new WebpackShellPlugin({
            onBuildStart: ['echo "Webpack Start"'],
            onBuildEnd: ['java -jar ' + path.resolve(__dirname, "../../_utils/google-closure/compiler.jar") + ' --js ' + path.resolve(__dirname, "./target/scala-2.12/global-webpack.js") + ' --js ' + path.resolve(__dirname, "./target/scala-2.12/" + module_name + "-jsdeps.js") + ' --js ' + path.resolve(__dirname, "./target/scala-2.12/" + module_name + "-fastopt.js") + ' --compilation_level ADVANCED --js_output_file ' + path.resolve(__dirname, "./target/scala-2.12/bundled.js") + ' --debug false']
        })*/,
        new WebpackOnBuildPlugin(function (stats) {
            console.log("Build complete.");

            console.log("Merging files ...");
            const concat = require('concatenate-files');
            concat([
                    path.resolve(__dirname, "./target/scala-2.12/global-webpack.js"),
                    path.resolve(__dirname, "./target/scala-2.12/" + module_name + "-jsdeps.min.js"),
                    path.resolve(__dirname, "./target/scala-2.12/" + module_name + "-opt.js")
                ],
                path.resolve(__dirname, "./target/scala-2.12/combined.js"), {separator: '\n/*File separator */\n'}, function (err, result) {
                    console.log("Merging files DONE.")
                });
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