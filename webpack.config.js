const path = require('path');

module.exports = {
	entry: ['@babel/polyfill', './src/index.js'],// irá empacotar em um único arquivo!!
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader"},
					{ loader: "css-loader"}
				],
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						//inject CSS to page
						loader: 'style-loader'
					}, {
						// translates CSS into CommonJS modules
						loader: 'css-loader'
					}, {
						// Run postcss actions
						loader: 'postcss-loader',
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
						// compiles Sass to CSS
						loader: 'sass-loader'
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
