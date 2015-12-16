var webpack = require('webpack');
var dirs = require('./directories');
var base = require('./base');
var hot = true;

base.entry = {
	bundle: [
		dirs.example+"index.js"
	]
}

base.module.loaders[0].loaders = [
	'react-hot'
,	'babel'
]
var devServer = {
	contentBase: dirs.public
,	port:8080
,	host:'localhost'
,	hot: hot
,	historyApiFallback: false
,	quiet: false
,	noInfo: false
,	lazy: !hot
,	filename: base.output.filename
,	watchOptions: {
		aggregateTimeout: 300
	,	poll: 1000
	}
,	headers: {"X-Custom-Header": "yes"}
,	stats: {colors: true}
}
var publicPath = 'http://'+devServer.host+':'+devServer.port+'/';
base.output.publicPath = publicPath
devServer.publicPath = publicPath

base.devServer = devServer
module.exports = base;
