"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.UploadFieldTemplate = function (_a) {
    var containerStyle = _a.containerStyle, tabIndex = _a.tabIndex, buttonStyle = _a.buttonStyle, label = _a.label, className = _a.className, inputProps = _a.inputProps;
    return (React.createElement("span", { style: containerStyle },
        React.createElement("button", { style: buttonStyle, tabIndex: tabIndex || 0, className: className }, label),
        React.createElement("input", __assign({ type: "file", tabIndex: -1 }, inputProps))));
};
exports.default = exports.UploadFieldTemplate;
//# sourceMappingURL=UploadFieldTemplate.js.map