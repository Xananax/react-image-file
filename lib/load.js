'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = load;
exports.loadString = loadString;
exports.loadFile = loadFile;
exports.loadBlob = loadBlob;

var _isString = require('./isString');

var _isString2 = _interopRequireDefault(_isString);

var _isBlob = require('./isBlob');

var _isBlob2 = _interopRequireDefault(_isBlob);

var _isFile = require('./isFile');

var _isFile2 = _interopRequireDefault(_isFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(prop, cb) {
	if ((0, _isString2.default)(prop)) {
		return loadString(prop, cb);
	}
	if ((0, _isBlob2.default)(prop)) {
		return loadBlob(prop, cb);
	}
	if ((0, _isFile2.default)(prop)) {
		return loadFile(prop, cb);
	}
}

function loadString(src, cb) {
	return cb(null, { src: src });
}

function loadFile(file, cb) {
	var reader = new FileReader();
	reader.onload = function (evt) {
		cb(null, {
			src: evt.target.result,
			alt: escape(file.name)
		});
	};
	reader.onerror = function (evt) {
		cb(evt);
	};
	reader.readAsDataURL(file);
}

function loadBlob(blob, cb) {
	try {
		(function () {
			var done = function done() {
				URL.revokeObjectURL(src);
			};

			var src = URL.createObjectURL(blob);

			cb(null, { src: src }, done);
		})();
	} catch (e) {
		return cb(e);
	}
}