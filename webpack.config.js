const path = require('path')
const webpack = require('webpack')
const extract = require('extract-text-webpack-plugin')

// Custom loader for static assets
const fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    context: path.resolve(__dirname, 'assets')
  }  
}

// Webpack configuration
module.exports = {
  entry: [
    './src/index.js',
    './assets/sass/style.scss',
    // 'multi-entry-loader?include=./assets/img/**.*!',
    // 'multi-entry-loader?include=./assets/fonts/**.*!',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },

  plugins: [
    new extract('css/style.css'),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extract.extract(['css-loader']),
      },
      {
        test: /\.scss$/,
        use: extract.extract({
          fallback: 'vue-style-loader',
          use: ['css-loader', 'sass-loader'],
        })
      },
      {
        test: /\.sass$/,
        use: extract.extract({
          fallback: 'vue-style-loader',
          use: ['css-loader', 'sass-loader?indentedSyntax'],
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'css': extract.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader'],
            }),
            'scss': extract.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader', 'sass-loader'],
            }),
            'sass': extract.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader', 'sass-loader?indentedSyntax'],
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [fileLoader, 'image-webpack-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [fileLoader]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json']
  },
  externals: {
    vue: 'Vue',
    tozti: 'tozti'
  }
}
