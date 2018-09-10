const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    https: true,
    hot: false,
    headers: { "Access-Control-Allow-Origin": "*" } 
  }
});
