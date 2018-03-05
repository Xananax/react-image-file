"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isFile_1 = require("./isFile");
var isBlob_1 = require("./isBlob");
var isString_1 = require("./isString");
/**
 * Returns true if the object can be used to set an image's display.
 * The function returns true if the passed object is one of:
 *
 * - An instance of the native `File` object
 * - A blob (contains the properties `content_type` and `data`)
 * - A non-empty string
 *
 * @param  prop an object to test
 * @return      true if the object is a File, a Blob, or a String
 */
exports.isReadable = function (prop) {
    return (prop
        && (isFile_1.isFile(prop) || isBlob_1.isBlob(prop) || isString_1.isString(prop)));
};
exports.default = exports.isReadable;
//# sourceMappingURL=isReadable.js.map