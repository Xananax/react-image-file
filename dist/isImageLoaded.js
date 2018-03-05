"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if an dom image has loaded
 * @param  img a dom image, created through `document.createElement("img")`, `new Image()`, or `document.getElement`
 * @return     true if the image has loaded, false otherwise
 */
exports.isImageLoaded = function (img) {
    return (!!(img && (img.complete || img.naturalWidth !== undefined)));
};
exports.default = exports.isImageLoaded;
//# sourceMappingURL=isImageLoaded.js.map