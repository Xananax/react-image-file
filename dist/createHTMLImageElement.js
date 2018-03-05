"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isImageLoaded_1 = require("./isImageLoaded");
var noOp_1 = require("./noOp");
/**
 * Creates a DOM image object and set its onload and onerror properties.
 * If the image was already cached, onload is set immediatly.
 * @param  src     the source of the image, You may leave it blank if you want to set it later
 * @param  onLoad  callback to call when the image loads (or has loaded). Receives the image object as a parameter
 * @param  onError callback to call when the image has an error. Receives the image object as a parameter.
 *                 Optional, but note that `onload` will never be called if an error occurs
 * @return         the image object
 */
exports.createHTMLImageElement = function (src, onLoad, onError) {
    var img = new Image();
    var called = false;
    img.alt = '';
    var callback = function () {
        if (!called) {
            called = true;
            img.onload = noOp_1.noOp;
            img.onerror = noOp_1.noOp;
            return true;
        }
        ;
        return false;
    };
    var onLoadWrapped = function () { return callback() && onLoad && onLoad(img); };
    var onErrorWrapped = function (err) { return callback() && onError && onError(img, err); };
    img.onload = onLoadWrapped;
    img.onerror = onErrorWrapped;
    if (src) {
        img.src = src;
    }
    ;
    if (isImageLoaded_1.isImageLoaded(img)) {
        setTimeout(onLoadWrapped);
    }
    ;
    return img;
};
exports.default = exports.createHTMLImageElement;
//# sourceMappingURL=createHTMLImageElement.js.map