module.exports = {
	context : __dirname + '/public',
	entry: './app.js',
	output: {
		path: __dirname + '/public/dist/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			 {
		 //      // JS LOADER
		 //      // Reference: https://github.com/babel/babel-loader
		 //      // Transpile .js files using babel-loader
		 //      // Compiles ES6 and ES7 into ES5 code
		 //      test: /\.js$/,
		       loader: 'babel',
		       exclude: /node_modules/
		     },
			{include: /\.json$/, loaders: ["json-loader"]}
		]
	},
	resolve: {
		extensions: ['','.json', '.jsx', '.js']
	}
};