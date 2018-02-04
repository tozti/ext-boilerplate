const path = require('path')
const webpack = require('webpack')
const extract = require('extract-text-webpack-plugin')

const isDev = (process.env.NODE_ENV === 'development')


const extractSass = new extract({
    filename: '[name].css',
    disable: isDev
})

const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: !isDev,
    sourceMap: isDev
  }
}

const fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]'
  }  
}


module.exports = {
  entry: [
    './src/index.js', 
    './assets/sass/style.scss',
    'multi-entry-loader?include=./assets/img/**.*!',
    'multi-entry-loader?include=./assets/fonts/**.*!',
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new extract('bundle.css'),
    new webpack.optimize.UglifyJsPlugin({minimize: !isDev})
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extract.extract([cssLoader]),
      },
      {
        test: /\.scss$/,
        use: extract.extract({
          fallback: 'vue-style-loader',
          use: [cssLoader, 'sass-loader'],
        })
      },
      {
        test: /\.sass$/,
        use: extract.extract({
          fallback: 'vue-style-loader',
          use: [cssLoader, 'sass-loader?indentedSyntax'],
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