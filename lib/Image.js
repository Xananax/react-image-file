'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _readableURLPropType = require('./readableURLPropType');

var _readableURLPropType2 = _interopRequireDefault(_readableURLPropType);

var _load2 = require('./load');

var _load3 = _interopRequireDefault(_load2);

var _createDOMImage = require('./createDOMImage');

var _createDOMImage2 = _interopRequireDefault(_createDOMImage);

var _constants = require('./constants');

var _ImageTemplate = require('./ImageTemplate');

var _ImageTemplate2 = _interopRequireDefault(_ImageTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = (function (_Component) {
	_inherits(Image, _Component);

	function Image(props, context) {
		_classCallCheck(this, Image);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Image).call(this, props, context));

		_this.state = {
			src: '',
			alt: '',
			status: _constants.EMPTY,
			width: 0,
			height: 0
		};
		return _this;
	}

	_createClass(Image, [{
		key: 'load',
		value: function load(props) {
			var that = this;
			that.setState({ status: _constants.LOADING });
			(0, _load3.default)(props, function (err, res, done) {
				if (err) {
					return that.setState({ status: _constants.ERROR, error: err });
				}
				(0, _createDOMImage2.default)(res.src, function (img) {
					that.setState({
						status: _constants.DONE,
						src: res.src,
						alt: res.alt,
						width: img.width,
						height: img.height
					});
					if (done) {
						done();
					}
				});
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.file) {
				this.load(this.props.file);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.file) {
				this.load(nextProps.file);
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return nextProps.file && nextProps.file != this.props.file || nextProps.alt && nextProps.alt != this.props.alt || nextProps.template && nextProps.template != this.props.template || nextState.src != this.state.src;
		}
	}, {
		key: 'render',
		value: function render() {

			var src = this.state.src;
			var alt = this.props.alt || this.state.alt || '';
			var imgWidth = this.state.width;
			var imgHeight = this.state.height;
			var Comp = this.props.template;
			var props = Object.assign({}, this.props, {
				src: src,
				alt: alt,
				imgWidth: imgWidth,
				imgHeight: imgHeight
			});

			return _react2.default.createElement(Comp, props);
		}
	}]);

	return Image;
})(_react.Component);

Image.propTypes = {
	template: _react.PropTypes.any,
	file: _react.PropTypes.oneOfType([_react.PropTypes.string, _readableURLPropType2.default]),
	alt: _react.PropTypes.string
};
Image.defaultProps = {
	template: _ImageTemplate2.default
};
exports.default = Image;