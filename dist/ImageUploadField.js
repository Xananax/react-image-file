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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var constants_1 = require("./constants");
var ImageLoader_1 = require("./ImageLoader");
var UploadField_1 = require("./UploadField");
exports.ImageUploadFieldThumbnailCloseButton = function (_a) {
    var onClick = _a.onClick;
    return (React.createElement("button", { onClick: onClick }, "x"));
};
exports.ImageUploadFieldThumbnail = function (_a) {
    var file = _a.file, className = _a.className, onClose = _a.onClose, imageWidth = _a.imageWidth, imageHeight = _a.imageHeight;
    var name = file ? file.name : 'no image';
    var status = file ? constants_1.EMPTY : constants_1.DONE;
    var props = { file: file,
        width: imageWidth,
        height: imageHeight,
        status: status,
        crop: 'cover'
    };
    var closeBtn = file ? React.createElement(exports.ImageUploadFieldThumbnailCloseButton, { onClick: onClose }) : null;
    return (React.createElement("div", { className: className },
        closeBtn,
        React.createElement(ImageLoader_1.ImageLoader, __assign({}, props)),
        React.createElement("span", null, name)));
};
/**
 * Simple Image Upload Field class to be used in any React project.
 */
var ImageUploadField = /** @class */ (function (_super) {
    __extends(ImageUploadField, _super);
    function ImageUploadField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        _this.removeImage = _this.removeImage.bind(_this);
        _this.renderImage = _this.renderImage.bind(_this);
        _this.state = { files: props.files || [] };
        return _this;
    }
    ;
    ImageUploadField.prototype.handleChange = function (files) {
        if (this.props.onChange) {
            this.props.onChange(files);
        }
        else {
            this.setState({ files: files });
        }
    };
    ;
    ImageUploadField.prototype.removeImage = function (n) {
        var files = this.state.files.slice();
        files.splice(n || 0, 1);
        ;
        this.handleChange(files);
    };
    ;
    ImageUploadField.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.files) {
            this.setState({ files: nextProps.files });
        }
    };
    ;
    ImageUploadField.prototype.renderImages = function (files) {
        if (files && files.length) {
            return (React.createElement("div", null, files.map(this.renderImage)));
        }
        return null;
    };
    ;
    ImageUploadField.prototype.renderImage = function (file, key) {
        var _a = this.props, imageWidth = _a.imageWidth, imageHeight = _a.imageHeight, className = _a.thumbnailClassName;
        var imageProps = { file: file,
            key: key,
            imageHeight: imageHeight,
            imageWidth: imageWidth,
            className: className,
            onClose: this.removeImage
        };
        return React.createElement(exports.ImageUploadFieldThumbnail, __assign({}, imageProps));
    };
    ;
    ImageUploadField.prototype.renderMultiple = function (input, images) {
        return (React.createElement("div", null,
            input,
            images));
    };
    ;
    ImageUploadField.prototype.renderUnique = function (input, images) {
        return (React.createElement("div", null,
            images,
            input));
    };
    ;
    ImageUploadField.prototype.render = function () {
        var files = this.state.files;
        var _a = this.props, Comp = _a.ImageUploadFieldTemplate, onChange = _a.onChange, fileInputProps = __rest(_a, ["ImageUploadFieldTemplate", "onChange"]);
        var input = React.createElement(UploadField_1.UploadField, __assign({}, fileInputProps, { onChange: this.handleChange }));
        var images = this.renderImages(files);
        var markup = (this.props.multiple
            ? this.renderMultiple(input, images)
            : this.renderUnique(input, images));
        return markup;
    };
    ImageUploadField.defaultProps = { ImageUploadFieldTemplate: 'div'
        // , imageWidth: 50
        // , imageHeight: 50
        ,
        thumbnailClassName: 'upload-thumbnail',
        accept: '.jpg,.png,.jpeg,.bmp,.gif,image/jpg,image/gif,image/png,image/bmp'
    };
    return ImageUploadField;
}(react_1.PureComponent));
exports.ImageUploadField = ImageUploadField;
exports.default = ImageUploadField;
//# sourceMappingURL=ImageUploadField.js.map