var webpack = require('webpack');

var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var sassLoaders = [
  "css-loader?sourceMap",
  "autoprefixer-loader?browsers=last 2 version",
  "sass-loader?indentedSyntax=sass&includePaths[]=" + path.resolve(__dirname, "./src"),
];

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel?stage=1'
    },
    {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!")),
    }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass'],
    modulesDirectories: ['src', 'node_modules']
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
    ,hot: true
  }
  ,plugins: [
    new ExtractTextPlugin("bundle.css"),
    new webpack.HotModuleReplacementPlugin()
]
};