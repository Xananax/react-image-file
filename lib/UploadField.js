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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttonStyle = {
	position: 'relative'
};

var inputStyle = {
	cursor: 'pointer',
	position: 'absolute',
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	width: '100%',
	opacity: 0
};

var UploadField = (function (_Component) {
	_inherits(UploadField, _Component);

	function UploadField(props, context) {
		_classCallCheck(this, UploadField);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UploadField).call(this, props, context));

		_this.handleChange = _this.handleChange.bind(_this);
		_this.state = { files: props.files || props.multiple ? [] : null };
		return _this;
	}

	_createClass(UploadField, [{
		key: 'handleChange',
		value: function handleChange(evt) {
			var files = evt.target.files;
			var multiple = this.props.multiple;
			if (this.props.onChange) {
				this.props.onChange(multiple ? files : files[0], evt.target.value);
			} else {
				this.setState({ files: multiple ? files : files[0] });
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
		key: 'renderInput',
		value: function renderInput(Comp, name, multiple, label) {
			return _react2.default.createElement(
				Comp,
				{ style: buttonStyle },
				label,
				_react2.default.createElement('input', { type: 'file', name: name, accept: 'image/*', onChange: this.handleChange, multiple: multiple, style: inputStyle })
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var files = this.state.files;
			var _props = this.props;
			var name = _props.name;
			var multiple = _props.multiple;
			var label = _props.label;

			var Comp = this.props.uploadFieldTemplate;
			return this.renderInput(Comp, name, multiple, label);
		}
	}]);

	return UploadField;
})(_react.Component);

UploadField.propTypes = {
	onChange: _react.PropTypes.func,
	name: _react.PropTypes.string,
	files: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
	uploadFieldTemplate: _react.PropTypes.any,
	filesTemplate: _react.PropTypes.func,
	label: _react.PropTypes.string
};
UploadField.defaultProps = {
	uploadFieldTemplate: 'button',
	label: 'upload'
};
exports.default = UploadField;