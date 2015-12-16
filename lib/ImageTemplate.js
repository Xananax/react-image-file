'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageTemplate = (function (_Component) {
	_inherits(ImageTemplate, _Component);

	function ImageTemplate() {
		_classCallCheck(this, ImageTemplate);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ImageTemplate).apply(this, arguments));
	}

	_createClass(ImageTemplate, [{
		key: 'renderDIV',
		value: function renderDIV(src, alt, width, height, crop) {
			var style = {
				width: width,
				height: height,
				backgroundImage: 'url(\'' + src + '\')',
				backgroundSize: crop,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '50% 50%'
			};
			var props = {
				title: alt,
				style: style
			};
			return _react2.default.createElement('div', props);
		}
	}, {
		key: 'renderIMG',
		value: function renderIMG(src, alt, width, height, crop) {
			var props = {
				src: src,
				alt: alt,
				width: width,
				height: height
			};
			return _react2.default.createElement('img', props);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var alt = _props.alt;
			var loadingURL = _props.loadingURL;
			var errorURL = _props.errorURL;
			var emptyURL = _props.emptyURL;
			var width = _props.width;
			var height = _props.height;
			var crop = _props.crop;
			var type = _props.type;

			var status = this.props.status || _constants.DONE;
			var src = status === _constants.LOADING && loadingURL ? loadingURL : status === _constants.ERROR && errorURL ? errorURL : status === _constants.EMPTY && emptyURL ? emptyURL : this.props.src;
			return type === 'img' ? this.renderIMG(src, alt, width, height, crop) : this.renderDIV(src, alt, width, height, crop);
		}
	}]);

	return ImageTemplate;
})(_react.Component);

ImageTemplate.propTypes = {
	src: _react.PropTypes.string.isRequired,
	alt: _react.PropTypes.string.isRequired,
	loadingURL: _react.PropTypes.string,
	errorURL: _react.PropTypes.string,
	emptyURL: _react.PropTypes.string,
	status: _react.PropTypes.oneOf([_constants.EMPTY, _constants.DONE, _constants.ERROR, _constants.LOADING]),
	width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	crop: _react.PropTypes.oneOf(['cover', 'contain']),
	type: _react.PropTypes.oneOf(['img', 'div'])
};
ImageTemplate.defaultProps = {
	type: 'div',
	crop: 'contain'
};
exports.default = ImageTemplate;