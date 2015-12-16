'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _UploadField = require('./UploadField');

var _UploadField2 = _interopRequireDefault(_UploadField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageUploadField = (function (_Component) {
	_inherits(ImageUploadField, _Component);

	function ImageUploadField(props, context) {
		_classCallCheck(this, ImageUploadField);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageUploadField).call(this, props, context));

		_this.handleChange = _this.handleChange.bind(_this);
		_this.state = { files: props.files || props.multiple ? [] : null };
		return _this;
	}

	_createClass(ImageUploadField, [{
		key: 'handleChange',
		value: function handleChange(files) {
			var multiple = this.props.multiple;
			if (this.props.onChange) {
				this.props.onChange(files);
			} else {
				this.setState({ files: files });
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.files) {
				this.setState({ files: nextProps.files });
			}
		}
	}, {
		key: 'renderImages',
		value: function renderImages(files) {
			var that = this;
			if (files.length) {
				return _react2.default.createElement(
					'div',
					null,
					Array.prototype.slice.call(files).map(that.renderImage.bind(this))
				);
			}
		}
	}, {
		key: 'renderImage',
		value: function renderImage(file, key) {
			var _props = this.props;
			var imageHeight = _props.imageHeight;
			var imageWidth = _props.imageWidth;

			key = key || 0;
			return file ? _react2.default.createElement(
				'div',
				{ key: key },
				_react2.default.createElement(_Image2.default, { file: file, width: imageWidth, height: imageHeight }),
				_react2.default.createElement(
					'span',
					null,
					file.name
				)
			) : _react2.default.createElement(
				'div',
				{ key: key },
				_react2.default.createElement(_Image2.default, { status: _constants.EMPTY, width: imageWidth, height: imageHeight }),
				_react2.default.createElement(
					'span',
					null,
					'no image'
				)
			);
		}
	}, {
		key: 'renderMultiple',
		value: function renderMultiple(Comp, input, images) {
			return _react2.default.createElement(
				Comp,
				null,
				input,
				images
			);
		}
	}, {
		key: 'renderUnique',
		value: function renderUnique(Comp, input, image) {
			return _react2.default.createElement(
				Comp,
				null,
				image,
				input
			);
		}
	}, {
		key: 'renderInput',
		value: function renderInput(name, multiple, files) {
			return _react2.default.createElement(_UploadField2.default, { name: name, label: this.props.label, multiple: multiple, files: files, onChange: this.handleChange });
		}
	}, {
		key: 'render',
		value: function render() {
			var files = this.state.files;
			var _props2 = this.props;
			var name = _props2.name;
			var multiple = _props2.multiple;

			var Comp = this.props.ImageUploadFieldTemplate;
			var input = this.renderInput(name, multiple, files);
			var images = multiple ? this.renderImages(files) : this.renderImage(files);
			return multiple ? this.renderMultiple(Comp, input, images) : this.renderUnique(Comp, input, images);
		}
	}]);

	return ImageUploadField;
})(_react.Component);

ImageUploadField.propTypes = {
	onChange: _react.PropTypes.func,
	name: _react.PropTypes.string,
	value: _react.PropTypes.any,
	files: _react.PropTypes.array,
	multiple: _react.PropTypes.bool,
	ImageUploadFieldTemplate: _react.PropTypes.any,
	imageWidth: _react.PropTypes.number,
	imageHeight: _react.PropTypes.number
};
ImageUploadField.defaultProps = {
	ImageUploadFieldTemplate: 'div',
	imageWidth: 50,
	imageHeight: 50
};
exports.default = ImageUploadField;