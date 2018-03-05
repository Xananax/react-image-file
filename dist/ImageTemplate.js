"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_1 = require("react");
exports.DivImage = function (_a) {
    var src = _a.src, status = _a.status, alt = _a.alt, width = _a.width, height = _a.height, imgHeight = _a.imgHeight, imgWidth = _a.imgWidth, crop = _a.crop, statusAttr = _a.statusAttr, className = _a.className;
    var props = (_b = { title: alt,
            className: className,
            style: { width: width,
                height: height,
                backgroundImage: "url('" + src + "')",
                backgroundSize: crop,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 50%"
            } }, _b[statusAttr] = true, _b);
    return React.createElement("div", __assign({}, props));
    var _b;
};
exports.ImgImage = function (_a) {
    var src = _a.src, status = _a.status, alt = _a.alt, width = _a.width, height = _a.height, statusAttr = _a.statusAttr, imgWidth = _a.imgWidth, imgHeight = _a.imgHeight, className = _a.className;
    var props = (_b = { src: src,
            alt: alt,
            width: width,
            height: height }, _b[statusAttr] = true, _b.className = className, _b);
    return React.createElement("img", __assign({}, props));
    var _b;
};
var ImageTemplate = /** @class */ (function (_super) {
    __extends(ImageTemplate, _super);
    function ImageTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageTemplate.prototype.render = function () {
        var props = this.props;
        var type = props.type;
        if (type === 'img') {
            return React.createElement(exports.ImgImage, __assign({}, props));
        }
        ;
        return React.createElement(exports.DivImage, __assign({}, props));
    };
    return ImageTemplate;
}(react_1.PureComponent));
exports.ImageTemplate = ImageTemplate;
exports.default = ImageTemplate;
//# sourceMappingURL=ImageTemplate.js.map