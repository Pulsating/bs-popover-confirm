var path = require('path');

module.exports = {
    context: __dirname + "/src/js",
	entry: './demo.js',
	output: {
		path: __dirname + '/dist/',
		filename: 'demo.build.js',
		chunkFilename: '[id].build.js'
	},
	devtool: 'eval',
	plugins: [],
	resolve: {
        root: [
        	path.resolve('src/js'),
        ],
        extensions: ['', '.js', '.min.js']
    }
};