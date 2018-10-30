'use strict';

var path = require("path");
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var WebpackOnBuildPlugin = require('on-build-webpack');
module.exports = {
  entry: {
    global: path.resolve(__dirname, './global.js')
  },
  output: {
    path: path.resolve(__dirname,"./target/scala-2.12"),
    filename: '[name].js'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {},
        mangle: true, // Note `mangle.properties` is `false` by default.
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: false,
      }
    })]
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, '../ui/users-app'),
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, '../ui/users-app/node_modules')
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new WebpackOnBuildPlugin(function (stats) {
      console.log("Build complete.");

      console.log("Merging files ...");
      const concat = require('concatenate-files');
      concat([
          //path.resolve(__dirname, "./target/scala-2.12/global.js"),
          path.resolve(__dirname, "./target/scala-2.12/deps.min.js"),
          path.resolve(__dirname, "./target/scala-2.12/app.min.js")
        ],
        path.resolve(__dirname, "./target/scala-2.12/combined.js"), {separator: '\n/*File separator*/\n'}, function (err, result) {
          console.log("Merging files DONE.")
        });
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',"@babel/preset-react"],
          plugins: ['react-hot-loader/babel', "@babel/plugin-proposal-class-properties"]
        }
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
  },
};