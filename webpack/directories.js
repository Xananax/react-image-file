var path = require('path');
var rootDir = path.resolve(__dirname+'/../')+'/';

module.exports = {
	root:rootDir
,	dist: rootDir+'dist/'
,	src: rootDir+'src/'
,	modules: rootDir+'node_modules/'
,	example: rootDir+'example/'
,	public: rootDir+'example/public/'
}
