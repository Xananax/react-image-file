'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _isReadable = require('./isReadable');

var _isReadable2 = _interopRequireDefault(_isReadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readableUrl(props, propName, componentName) {
	if (!(propName in props) || !props[propName]) {
		return;
	}
	var prop = props[propName];
	if (!(0, _isReadable2.default)(prop)) {
		return new Error('`' + propName + '` is not a valid Blob or File');
	}
}

function isReadableRequired(props, propName, componentName) {
	if (!(propName in props) || !props[propName]) {
		return new Error('`' + propName + '` is required');
	}
	return readableUrl(props, propName, componentName);
}

readableUrl.isRequired = isReadableRequired;

exports.default = readableUrl;