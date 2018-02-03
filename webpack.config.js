const path = require('path')
const webpack = require('webpack')
const Extract = require('extract-text-webpack-plugin')

const development = process.env.NODE_ENV === 'development'

const extractSass = new Extract({
    filename: "[name].[contenthash].css",
    disable: development
})

const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: !development,
    sourceMap: development
  }
}

const fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]'
  }  
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new Extract('bundle.css')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: Extract.extract([cssLoader]),
      },
      {
        test: /\.scss$/,
        use: extractor.extract({
          fallback: 'vue-style-loader',
          use: cssLoader, 'sass-loader'],
        })
      },
      {
        test: /\.sass$/,
        use: Extract.extract({
          fallback: 'vue-style-loader',
          use: cssLoader, 'sass-loader?indentedSyntax'],
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': ['vue-style-loader', cssLoader, 'sass-loader'],
            'sass': ['vue-style-loader', cssLoader, 'sass-loader?indentedSyntax']
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