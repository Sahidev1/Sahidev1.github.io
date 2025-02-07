const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env) => {
  console.log(`env print: ${JSON.stringify(env)}`)
  return {
    entry: './src/root.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.DefinePlugin({
        INJECTED: JSON.stringify({
          env: env
        })
      }),
      new CopyPlugin({
        patterns: [
          { from: 'public/_redirects', to: '' },
          { from: 'public/data/*.json', to: '[name][ext]' },
          { from: 'public/assets/*.png', to: '[name][ext]' },
          { from: '.github/scripts/*.sh', to: 'script/[name][ext]'},
          { from: 'public/backup_cache', to: 'backup_cache'},
          { from: '.personalproject/', to: 'personalproject/[name][ext]'}
        ]
      })
    ],
    devServer: {
      static: './dist',
      port: 3000,
      open: false,
      historyApiFallback: true
    },
  }
};
