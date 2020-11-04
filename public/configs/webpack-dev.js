// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack-common');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: './index.tsx', // the entry point of our app
  devServer: {
    hot: true, // enable HMR on the server
    hotOnly: true, // only updates with successful compilation
    historyApiFallback: true,
    port: 8081,
    stats: {
      color: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  },
  output: {
    publicPath: "/"
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  performance: {
    hints: false,
  },
});
