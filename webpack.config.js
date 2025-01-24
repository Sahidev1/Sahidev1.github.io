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
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
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
          {from: 'public/_redirects', to: '' }
        ]
      })
    ],
    devServer: {
      static: './dist',
      port: 3000,
      open: true,
    },
  }
};
