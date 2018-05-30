const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const common = {
  target: 'electron-main',
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream'
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

module.exports = process.env.NODE_ENV === 'development' ? Object.assign({
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWepackPlugin({
        title: 'Output Management',
        template: './src/index.html'
      }),
      new webpack.DefinePlugin({  
        'process.env':{  
          'NODE_ENV': JSON.stringify('development')  
        }  
      })
    ]
}, common) : Object.assign({
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWepackPlugin({
      title: 'Output Management',
      template: './src/index.html',
      minify: {
        html5: true,
        ignoreCustomComments: true,
        minifyCSS: true,
        minifyJS: true,
        preserveLineBreaks: true,
        preventAttributesEscaping: true
      }
    }),
    new webpack.DefinePlugin({  
      'process.env':{  
        'NODE_ENV': JSON.stringify('production')  
      }  
    })
  ]
}, common)
