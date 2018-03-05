"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isString_1 = require("./isString");
var isBlob_1 = require("./isBlob");
var isFile_1 = require("./isFile");
/**
 * This is a dumb function that essentially takes a string and assigns it to an object
 * of shape `{src:string}`. It exists only so the `loadAnything` function, which accepts
 * blobs, files, or strings, works with whatever it is given
 * @param src a string
 * @param cb   A callback to use when done. The Callback receives three arguments
 *  - err: An error object if `src` is empty, `null` otherwise
 *  - res: the resource object. It will have a `src` property
 */
exports.loadString = function (src, cb) {
    return (src
        ? cb(null, { src: src })
        : cb(new Error("src is empty")));
};
/**
 * Creates a suitable data string to use from a dom File object
 * @param file a dom File object
 * @param cb   A callback to use when done. The Callback receives three arguments
 *  - err: An error object if there was an error, `null` otherwise
 *  - res: the resource object. It will have a `src` property, and an `alt` property containing the file name
 */
exports.loadFile = function (file, cb) {
    var reader = new FileReader();
    reader.onload = function (evt) {
        cb(null, { src: reader.result,
            alt: file.name
        });
    };
    reader.onerror = function (evt) { return cb(reader.error); };
    reader.readAsDataURL(file);
};
/**
 * Creates a data string from a blob, that you can use in an image.
 * Don't forget to call `done` once you've used it to free the memory
 * @param blob the blob
 * @param cb   A callback to use when done. The Callback receives three arguments
 *  - err: An error object if there was an error, `null` otherwise
 *  - res: the resource object. It will have a `src` property
 *  - done: an optional function used to free the resource; you need to call that after assigning the resource to an image
 */
exports.loadBlob = function (blob, cb) {
    try {
        var src_1 = URL.createObjectURL(blob);
        var done = function () { return URL.revokeObjectURL(src_1); };
        cb(null, { src: src_1 }, done);
    }
    catch (err) {
        return cb(err);
    }
};
/**
 * Loads a Blob, or a File in a way that makes it suitable to be used in a node image
 * Does nothing to strings, but accepts them in order to make it easy to use this function everywhere
 *
 * @param prop the src to load
 * @param cb   A callback to use when done. The Callback receives three arguments
 *  - err: An error object if there was an error, `null` otherwise
 *  - res: the resource object. It will have a `src` property, and possibly an `alt` property
 *  - done: an optional function used to free the resource; you need to call that after assigning the resource to an image
 */
exports.loadAnything = function (prop, cb) {
    return (isString_1.isString(prop)
        ? exports.loadString(prop, cb)
        : (isBlob_1.isBlob(prop)
            ? exports.loadBlob(prop, cb)
            : (isFile_1.isFile(prop)
                ? exports.loadFile(prop, cb)
                : cb(new Error("prop `" + prop + "` is not a valid loadable object")))));
};
exports.default = exports.loadAnything;
//# sourceMappingURL=load.js.map