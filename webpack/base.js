var dirs = require('./directories');
const publicPath = '/static/';

module.exports = 
	{ context: dirs.root
	, entry:
		{ bundle:
			[dirs.src+"index.js"]
		}
	, output: 
		{ path: dirs.dist
		, publicPath: "/"
		, filename: "[name].js"
		}
	, resolve:
		{ extensions:
			['','.js','.jsx','.styl','.jade','.md','.css','.ts','.tsx']
		}
	, module: 
		{ loaders: 
			[
				{ test: /\.jsx?$/
				, exclude: /node_modules/
				, loaders: ["babel"]
				}
			,	{ test: /\.styl$/
				//,	loader: ExtractTextPlugin.extract("style-loader",'!css-loader!stylus-loader')
				, loader:'style-loader!css-loader!stylus-loader'
				}
			,	{ test: /\.css$/
				, loader: "style-loader!css-loader"
				}
			,	{ test: /\.tsx?$/
				, loaders: ['ts-loader']
				, include: dirs.src
				}
			]
		}
	, devtool:"eval"
	}
