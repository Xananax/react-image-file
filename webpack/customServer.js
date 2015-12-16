var webpack = require('webpack');
var base = require('./server');
var dirs = require('./directories');

base.entry.bundle.unshift(
	'webpack-dev-server/client?http://localhost:3000'
,	'webpack/hot/only-dev-server'
)

base.output.publicPath = 'http://localhost:3000/'

var newPlugins = [
	new webpack.HotModuleReplacementPlugin()
,	new webpack.NoErrorsPlugin()
];

base.plugins = base.plugins ? base.plugins.concat(newPlugins) : newPlugins;

base.module.loaders[0].include = [dirs.example,dirs.src]
base.devtool = 'eval'

module.exports = base;
