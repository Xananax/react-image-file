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
var UploadFieldTemplate_1 = require("./UploadFieldTemplate");
var containerStyle = { position: 'relative',
    display: 'inline-block'
};
var buttonStyle = { cursor: 'pointer',
    display: 'inline-block',
    top: 0,
    left: 0
};
var inputStyle = { position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
};
/**
 * Takes a file iterator as the one created by a file input
 * and transforms it into an array of html File objects
 * @param files
 */
exports.fileListToArray = function (files) {
    return (Array.prototype.slice.call(files));
};
/**
 * A simple upload field to be used in any React project.
 */
var UploadField = /** @class */ (function (_super) {
    __extends(UploadField, _super);
    function UploadField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleChange = function (evt) {
            var files = exports.fileListToArray(evt.target.files);
            if (_this.props.onChange) {
                _this.props.onChange(files, evt.target.value);
            }
            else {
                _this.setState({ files: files });
            }
        };
        _this.state = { files: props.files || [] };
        return _this;
    }
    ;
    UploadField.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.files) {
            this.setState({ files: nextProps.files });
        }
    };
    ;
    UploadField.prototype.render = function () {
        var files = this.state.files;
        var _a = this.props, id = _a.id, name = _a.name, multiple = _a.multiple, label = _a.label, accept = _a.accept, className = _a.className, tabIndex = _a.tabIndex;
        var Comp = this.props.uploadFieldTemplate;
        var inputProps = { id: id,
            name: name,
            accept: accept,
            onChange: this.handleChange,
            multiple: multiple,
            style: inputStyle
        };
        var props = { containerStyle: containerStyle,
            buttonStyle: buttonStyle,
            label: label,
            inputProps: inputProps,
            className: className,
            tabIndex: tabIndex
        };
        return React.createElement(Comp, __assign({}, props));
    };
    UploadField.defaultProps = { uploadFieldTemplate: UploadFieldTemplate_1.UploadFieldTemplate,
        label: 'upload',
        accept: 'image/*'
    };
    return UploadField;
}(react_1.PureComponent));
exports.UploadField = UploadField;
exports.default = UploadField;
//# sourceMappingURL=UploadField.js.map