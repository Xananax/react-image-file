"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns true if the passed `obj` is a blob type object.
 * An object is considered a valid blob if it has the properties
 * `content_type` and `data`
 * @param  obj an object to test
 * @return     true if the object is a blob
 */
exports.isBlob = function (obj) {
    return (obj && obj.content_type && obj.data);
};
exports.default = exports.isBlob;
//# sourceMappingURL=isBlob.js.map