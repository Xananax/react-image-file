var dirs = require('./directories');

module.exports = {
	context: dirs.root
,	entry: {
		bundle: [dirs.src+"index.js"]
	}
,	output: {
		path: dirs.dist
	,	publicPath: "/"
	,	filename: "[name].js"
	}
,	resolve: {
		extensions: ['','.js','.jsx','.styl','.jade','.md','.css']
	}
,	module: {
		loaders: [
			{
				test: /\.js$/
			,	exclude: /node_modules/
			,	loaders: ["babel"]
			}
		,	{
				test: /\.styl$/
			//,	loader: ExtractTextPlugin.extract("style-loader",'!css-loader!stylus-loader')
			,	loader:'style-loader!css-loader!stylus-loader'
			}
		,	{
				test: /\.css$/
			,	loader: "style-loader!css-loader"
			}
		]
	}
,	devtool:"#source-map"
}
