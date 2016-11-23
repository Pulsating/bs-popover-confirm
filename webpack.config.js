var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname + "/src/js",
	entry: './example.js',
	output: {
		path: __dirname + '/dist/',
		filename: 'example.build.js',
		chunkFilename: '[id].build.js'
	},
	devtool: 'eval',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments:false
        })
	],
	resolve: {
        root: [
        	path.resolve('src/js'),
        ],
        extensions: ['', '.js', '.min.js']
    }
};