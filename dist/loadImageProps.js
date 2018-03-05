"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var load_1 = require("./load");
var createHTMLImageElement_1 = require("./createHTMLImageElement");
/**
 * Loads an image buffer from a File, a Blob, or a string
 * Then creates an object with { src, alt, width, height }
 * and calls the passed callback with that object.
 *
 * It accomplishes this by creating an HTML image element,
 * waiting for it to load, then calling the callback,
 * then discarding the image element
 * @param props anything that can become a readable image
 * @param cb a function of shape (err:Error, props:imageProps), where `imageProps` is the object described above
 *
 */
exports.loadImageProps = function (props, cb) {
    return (load_1.loadAnything(props, function (err, res, done) {
        if (err) {
            cb(err);
        }
        else if (res) {
            createHTMLImageElement_1.createHTMLImageElement(res.src, function (img) {
                var ret = { src: res.src,
                    alt: (('alt' in res) ? res.alt : ''),
                    width: img.width,
                    height: img.height
                };
                if (done) {
                    done();
                }
                ;
                cb(null, ret);
            });
        }
    }));
};
exports.default = exports.loadImageProps;
//# sourceMappingURL=loadImageProps.js.map