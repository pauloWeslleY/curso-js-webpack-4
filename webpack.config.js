const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/* entry: ['@babel/polyfill', './src/index.js'],// TODO:irá empacotar em um único arquivo!!
output: {
	path: path.resolve(__dirname, 'dist'),
	filename: 'bundle.js'
}, */

module.exports = {
	entry: {
		babelPolyfill: '@babel/polyfill',
		index: './src/index.js'
	},// TODO:irá empacotar em um único arquivo!!
	output: {
		path: path.resolve(__dirname, 'dist/bundle'),
		filename: '[name].bundle.js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "index.css"
		})
	],
	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						comments: false,
					},
				}
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					{loader: MiniCssExtractPlugin.loader }, // style-loader
					{loader: "css-loader"}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			/* {
				test: /\.css$/,
				use: [
					{ loader: "style-loader"},
					{ loader: "css-loader"}
				],
			}, */
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader //inject CSS to page 'style-loader'
					}, {
						loader: 'css-loader' // translates CSS into CommonJS modules
					}, {
						loader: 'postcss-loader', // Run postcss actions
						options: {
							// `postcssOptions` is needed for postcss 8.x;
      					// if you use postcss 7.x skip the key
							postcssOptions: {
								// postcss plugins, can be exported to postcss.config.js
								plugins: function () {
									return [
										require('autoprefixer')
									];
								}
							}
						}
					}, {
						loader: 'sass-loader' // compiles Sass to CSS
					}
				]
			}
			/* {
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					// COmpile Sass to CSS
					"sass-loader",
				]
			} */
			/* {
				test: /\.css$/,
				use: [
					{ loader: "style-loader"},
					{ loader: "file-loader"}
				],
			} */
		]
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 9000
	}
};
