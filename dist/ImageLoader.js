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
var loadImageProps_1 = require("./loadImageProps");
var isDefined_1 = require("./isDefined");
var constants_1 = require("./constants");
var transparentGIF_1 = require("./transparentGIF");
var ImageTemplate_1 = require("./ImageTemplate");
/**
 * Chooses a different src string depending on
 * the status provided.
 * That is, returns the loadingURL src if the status is
 * `LOADING`, the errorURL src if the status is `ERROR`,
 * the emptyURL src if the status is `EMPTY`, and the
 * default src for any other status
 * @param status the status, `LOADING`, `ERROR`, `EMPTY` or `DONE`
 * @param src the default src string, to be used on DONE status, or if other URLS are not available
 * @param urls an object of three urls, loadingURL,errorURL,emptyURL, all optional
 */
exports.getSRC = function (status, src, props) {
    if (!props) {
        return src || '';
    }
    ;
    var loadingURL = props.loadingURL, errorURL = props.errorURL, emptyURL = props.emptyURL;
    var ret = (status === constants_1.LOADING && loadingURL
        ? loadingURL
        : (status === constants_1.ERROR && errorURL
            ? errorURL
            : (status === constants_1.EMPTY && emptyURL
                ? emptyURL
                : src || '')));
    return ret;
};
/**
 * Returns the status
 * @param props
 */
exports.getStatus = function (props) {
    return (props.status || constants_1.DONE);
};
/**
 * returns the crop type
 * @param props
 */
exports.getCrop = function (props) {
    return (props && props.crop ? props.crop : 'contain');
};
/**
 * Returns a data-x string, where 'x' is the status
 * useful for css targeting
 * @param status the status of the image loader
 */
exports.statusAsAttr = function (status) {
    return ("data-status-" + (status || 'unknown').toLowerCase());
};
var ImageLoader = /** @class */ (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader(props, context) {
        var _this = _super.call(this, props, context) || this;
        ;
        _this.state =
            { src: transparentGIF_1.transparentGIF,
                alt: '',
                status: constants_1.EMPTY,
                width: 0,
                height: 0
            };
        return _this;
    }
    ;
    ImageLoader.prototype.load = function (props) {
        var _this = this;
        this.setState({ status: constants_1.LOADING });
        ;
        loadImageProps_1.loadImageProps(props, function (error, _a) {
            var src = _a.src, alt = _a.alt, width = _a.width, height = _a.height;
            return (error
                ? _this.setState({ status: constants_1.ERROR, error: error })
                : _this.setState({
                    status: constants_1.DONE,
                    src: src,
                    alt: alt,
                    width: width,
                    height: height
                }));
        });
    };
    ;
    ImageLoader.prototype.componentDidMount = function () {
        if (this.props.file) {
            this.load(this.props.file);
        }
    };
    ;
    ImageLoader.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.file !== this.props.file) {
            if (nextProps.file) {
                this.load(nextProps.file);
            }
            else if (nextProps.file == null) {
                this.setState({ src: transparentGIF_1.transparentGIF });
            }
        }
    };
    ;
    ImageLoader.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return ((isDefined_1.isDefined(nextProps.file) && nextProps.file !== this.props.file) ||
            (isDefined_1.isDefined(nextProps.alt) && nextProps.alt !== this.props.alt) ||
            (isDefined_1.isDefined(nextProps.template) && nextProps.template !== this.props.template) ||
            (nextState.src !== this.state.src));
    };
    ;
    ImageLoader.prototype.render = function () {
        var _a = this.state, src = _a.src, imgWidth = _a.width, imgHeight = _a.height;
        var _b = this.props, template = _b.template, width = _b.width, height = _b.height, className = _b.className;
        var alt = this.props.alt || this.state.alt || '';
        ;
        var crop = exports.getCrop(this.props);
        var status = exports.getStatus(this.state);
        var statusAttr = exports.statusAsAttr(status);
        var props = __assign({}, this.props, { src: exports.getSRC(status, src, this.props), alt: alt,
            width: width,
            height: height,
            imgWidth: imgWidth,
            imgHeight: imgHeight,
            crop: crop,
            status: status,
            statusAttr: statusAttr,
            className: className });
        return React.createElement(template, props);
    };
    ImageLoader.defaultProps = { template: ImageTemplate_1.ImageTemplate,
        crop: 'contain',
        emptyURL: transparentGIF_1.transparentGIF
    };
    return ImageLoader;
}(react_1.Component));
exports.ImageLoader = ImageLoader;
exports.default = ImageLoader;
//# sourceMappingURL=ImageLoader.js.map