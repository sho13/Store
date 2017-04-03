const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client/src'),
  devtool: '#eval-source-map',
  entry: [
    './app.jsx',
  ],
  output: {
    path: path.join(__dirname, 'client/public/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ]
};
