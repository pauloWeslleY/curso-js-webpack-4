const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: ['@babel/polyfill', './src/index.js'],// irá empacotar em um único arquivo!!
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "index.css"
		})
	],
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
