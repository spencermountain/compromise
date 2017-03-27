var webpack = require('webpack');

module.exports = {

  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: './builds',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: false
    })
  ]
};
