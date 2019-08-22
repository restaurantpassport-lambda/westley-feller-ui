const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const Critters = require('critters-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	dist: path.join(__dirname, 'dist')
};


module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader'
				},
				{
					loader: 'postcss-loader'
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
						// options...
					}
				}
			]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].bundle.css'
		}),
		new PurgecssPlugin({
			paths: glob.sync(`${PATHS.dist}/**/*`,  { nodir: true }),
		}),
		new Critters({
		})
	]
};
