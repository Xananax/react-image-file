"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isReadable_1 = require("./isReadable");
/**
 * A comvenience propType to use in React.
 * Verifies that the passed object, if any, is a string, a File, or a Blob
 */
exports.readableUrl = function (props, propName, componentName) {
    if (!(propName in props) || !props[propName]) {
        return;
    }
    ;
    var prop = props[propName];
    if (!isReadable_1.isReadable(prop)) {
        return new Error("`" + propName + "` is not a valid Blob or File");
    }
    ;
    return;
};
/**
 * A convenience propType to use in React.
 * Verifies that the passed object is a string, a File, or a Blob
 */
exports.isRequired = function (props, propName, componentName) {
    if (!(propName in props) || !props[propName]) {
        return new Error("`" + propName + "` is required");
    }
    ;
    return exports.readableUrl(props, propName, componentName);
};
exports.readableUrl.isRequired = exports.isRequired;
exports.default = exports.readableUrl;
//# sourceMappingURL=readableURLPropType.js.map