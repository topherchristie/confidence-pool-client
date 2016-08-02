module.exports = {
	context : __dirname + '/app',
	entry: './index.js',
	output: {
		path: __dirname + '/app',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{include: /\.json$/, loaders: ["json-loader"]}
		]
	},
	resolve: {
		extensions: ['','.json', '.jsx', '.js']
	}
};
