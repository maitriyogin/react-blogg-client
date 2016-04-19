var webpack = require('webpack');

var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "autoprefixer", "sass"]
      },

      {
        test: /\.css$/,
        loaders: ["style", "css"]
      },

      {test: /\.woff$/, loader: "url-loader?limit=100000"}
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: ['src', 'node_modules']
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
    , hot: true
  },
  sasslint: {
    configFile: '.sass-lint.yml',
    emitWarning: false,
    failOnError: true,
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
  ]
};
