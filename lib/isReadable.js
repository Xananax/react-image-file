'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = isReadable;

var _isFile = require('./isFile');

var _isFile2 = _interopRequireDefault(_isFile);

var _isBlob = require('./isBlob');

var _isBlob2 = _interopRequireDefault(_isBlob);

var _isString = require('./isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isReadable(prop) {
	var valid = (0, _isFile2.default)(prop) || (0, _isBlob2.default)(prop) || (0, _isString2.default)(prop);
	return valid;
}