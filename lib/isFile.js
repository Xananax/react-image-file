"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = isFile;
function isFile(obj) {
	return obj && obj instanceof File;
}