"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = isBlob;
function isBlob(obj) {
	return obj && obj.content_type && obj.data;
}