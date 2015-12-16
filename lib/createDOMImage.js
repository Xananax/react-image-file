"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createDOMImage;
function createDOMImage(src, onload) {

	var img = document.createElement("img");
	img.src = src;
	img.onload = function () {
		onload(img);
	};
}