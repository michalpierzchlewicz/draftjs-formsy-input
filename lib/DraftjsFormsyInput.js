'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

// eslint-disable-line import/no-unresolved

var _draftJs = require('draft-js');

// eslint-disable-line import/no-unresolved

var _draftJsExportHtml = require('draft-js-export-html');

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

// eslint-disable-line import/no-unresolved

var messages = {
	outputValueFormError: 'Wrong outputValueForm prop value in DraftjsFormsyInput. Needs to be \'html\' or \'raw\'.'
};

var defaultSyle = {
	main: {},
	label: {
		paddingBottom: 6
	},
	help: {
		padding: '6px 0',
		color: 'rgba(0, 0, 0, 0.5)'
	},
	editor: {
		boxSizing: 'border-box',
		border: '1px solid #ddd',
		cursor: 'text',
		padding: '16px',
		borderRadius: 2,
		boxShadow: 'inset 0 1px 8px -3px #ababab',
		background: '#fefefe'
	},
	editorError: {
		boxSizing: 'border-box',
		border: '1px solid #ff0000',
		cursor: 'text',
		padding: '16px',
		borderRadius: 2,
		boxShadow: 'inset 0 1px 8px -3px #ababab',
		background: '#fefefe'
	}
};

var _getStyle = function _getStyle(propsStyle) {
	// inserts styling provided from props into style:
	var style = defaultSyle;
	if (propsStyle && typeof propsStyle === 'object') {
		Object.entries(propsStyle).forEach(function (el) {
			return style[el[0]] = el[1];
		});
	}
	return style;
};

var DraftjsFormsyInput = (function (_React$Component) {
	_inherits(DraftjsFormsyInput, _React$Component);

	function DraftjsFormsyInput(props) {
		_classCallCheck(this, DraftjsFormsyInput);

		_get(Object.getPrototypeOf(DraftjsFormsyInput.prototype), 'constructor', this).call(this, props);

		if (props.outputValueForm !== 'html' && props.outputValueForm !== 'raw') console.error(messages.outputValueFormError);

		this.style = _getStyle(props.style);

		this.state = {
			editorState: _draftJs.EditorState.createEmpty()
		};
	}

	_createClass(DraftjsFormsyInput, [{
		key: '_onEditorChange',
		value: function _onEditorChange(editorState) {
			if (this._checkEditorHasText()) {
				this.setState({
					editorState: editorState
				});
				this._setValue(editorState);
			} else {
				this.setState({
					editorState: editorState
				});
				this.props.setValue(undefined);
			}
		}
	}, {
		key: '_setValue',
		value: function _setValue(editorState) {
			var _props = this.props;
			var outputValueForm = _props.outputValueForm;
			var setValue = _props.setValue;

			switch (outputValueForm) {
				case 'html':
					{
						setValue((0, _draftJsExportHtml.stateToHTML)(editorState.getCurrentContent()));
						break;
					}
				case 'raw':
					{
						setValue((0, _draftJsExportHtml.stateToHTML)(editorState.getCurrentContent()));
						break;
					}
				default:
					console.error(messages.outputValueFormError);
			}
		}
	}, {
		key: '_checkEditorHasText',
		value: function _checkEditorHasText() {
			return this.state.editorState.getCurrentContent().hasText();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var label = _props2.label;
			var getErrorMessage = _props2.getErrorMessage;
			var help = _props2.help;
			var placeholder = _props2.placeholder;
			var isRequired = _props2.isRequired;
			var showRequired = _props2.showRequired;
			var isFormSubmitted = _props2.isFormSubmitted;
			var editorState = this.state.editorState;

			var errorMessage = getErrorMessage();

			return _react2['default'].createElement(
				'div',
				{ style: this.style.main },
				label ? _react2['default'].createElement(
					'div',
					{ style: this.style.label },
					label,
					isRequired() ? ' *' : null
				) : null,
				_react2['default'].createElement(
					'div',
					{ style: showRequired() && isFormSubmitted() ? this.style.editorError : this.style.editor },
					_react2['default'].createElement(_draftJs.Editor, {
						editorState: editorState,
						onChange: this._onEditorChange.bind(this),
						placeholder: placeholder
					})
				),
				_react2['default'].createElement(
					'span',
					null,
					errorMessage
				),
				help ? _react2['default'].createElement(
					'div',
					{ style: this.style.help },
					help
				) : null
			);
		}
	}]);

	return DraftjsFormsyInput;
})(_react2['default'].Component);

DraftjsFormsyInput.propTypes = {
	// props recieved from formsy HOC:
	setValue: _react2['default'].PropTypes.func.isRequired,
	getValue: _react2['default'].PropTypes.func.isRequired,
	getErrorMessage: _react2['default'].PropTypes.func.isRequired,
	isRequired: _react2['default'].PropTypes.func,
	// showError: React.PropTypes.func,
	// showRequired: React.PropTypes.func.isRequired,
	// showError: React.PropTypes.func.isRequired,

	label: _react2['default'].PropTypes.string,
	style: _react2['default'].PropTypes.shape({
		main: _reactStyleProptype2['default'],
		label: _reactStyleProptype2['default'],
		help: _reactStyleProptype2['default'],
		editor: _reactStyleProptype2['default']
	}),
	outputValueForm: _react2['default'].PropTypes.string,
	// value: React.PropTypes.object,
	// defaultValue: React.PropTypes.object,
	placeholder: _react2['default'].PropTypes.string,
	help: _react2['default'].PropTypes.string
};

DraftjsFormsyInput.defaultProps = {
	label: null,
	placeholder: '. . .',
	style: null,
	help: null,
	outputValueForm: 'html'
};

exports['default'] = (0, _formsyReact.HOC)(DraftjsFormsyInput);
module.exports = exports['default'];