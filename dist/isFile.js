"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests if an object is a javascript native File object
 * @param  obj an object to test
 * @return     true if the object is an instance of `File`
 */
exports.isFile = function (obj) {
    return (obj && (obj instanceof File));
};
exports.default = exports.isFile;
//# sourceMappingURL=isFile.js.map