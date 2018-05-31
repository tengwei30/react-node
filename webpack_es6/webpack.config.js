var path = require('path')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var webpack = require('webpack')

module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,

				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',

						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [
		new UglifyJSPlugin(),
		new MiniCssExtractPlugin({ filename: './src/style.css' })
	],

	entry: {
		app: './src/index.js'
	},

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	mode: 'production'
};
