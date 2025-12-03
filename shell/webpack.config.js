const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        transactions: 'transactions@http://localhost:3001/remoteEntry.js',
        profile: 'profile@http://localhost:3002/remoteEntry.js',
        notifications: 'notifications@http://localhost:3003/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: '^18.2.0', strictVersion: false },
        'react-dom': { singleton: true, eager: false, requiredVersion: '^18.2.0', strictVersion: false },
        'react-router-dom': { singleton: true, eager: false },
        '@reduxjs/toolkit': { singleton: true, eager: false },
        'react-redux': { singleton: true, eager: false },
        '@tanstack/react-query': { singleton: true, eager: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
