import React from 'react';
import { HOC as formsyHOC } from 'formsy-react'; // eslint-disable-line import/no-unresolved
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js'; // eslint-disable-line import/no-unresolved
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import stylePropType from 'react-style-proptype'; // eslint-disable-line import/no-unresolved



const messages = {
	outputValueModeError: `Wrong outputValueMode prop value in DraftjsFormsyInput. Needs to be 'html' or 'raw'.`,
};

const defaultSyle = {
	main: {},
	label: {
		paddingBottom: 6,
	},
	help: {
		padding: '6px 0',
		color: 'rgba(0, 0, 0, 0.5)',
	},
	editor: {
		boxSizing: 'border-box',
		border: '1px solid #ddd',
		cursor: 'text',
		padding: '16px',
		borderRadius: 2,
		boxShadow: 'inset 0 1px 8px -3px #ababab',
		background: '#fefefe',
	},
	editorError: {
		boxSizing: 'border-box',
		border: '1px solid #ff0000',
		cursor: 'text',
		padding: '16px',
		borderRadius: 2,
		boxShadow: 'inset 0 1px 8px -3px #ababab',
		background: '#fefefe',
	},
};

const _getStyle = (propsStyle) => {
	// inserts styling provided from props into style:
	const style = defaultSyle;
	if (propsStyle && typeof propsStyle === 'object') {
		Object.entries(propsStyle).forEach(el => (style[el[0]] = el[1]));
	}
	return style;
};

class DraftjsFormsyInput extends React.Component {

	constructor(props) {
		super(props);

		if (props.outputValueMode !== 'html' &&
			props.outputValueMode !== 'raw') console.error(messages.outputValueModeError);

		this.style = _getStyle(props.style);

		const value = props.getValue();
		
		this.state = {
			editorState: this._setEditorStateFromValue(value),
		};
	}

	_onEditorChange(editorState) {
		if (this._checkEditorHasText()) {
			this.setState({
				editorState,
			});
			this._setValue(editorState);
		} else {
			this.setState({
				editorState,
			});
			this.props.setValue(undefined);
		}
	}

	_setEditorStateFromValue(value) {
		const { outputValueMode } = this.props;
		let editorState = EditorState.createEmpty();
		if (value) {
			switch(outputValueMode) {
			case 'html': {
				editorState = EditorState.createWithContent(stateFromHTML(value));
				break;
			}
			case 'raw': {
				editorState = EditorState.createWithContent(convertFromRaw(value));
				break;
			}
			default:
				console.error(messages.outputValueModeError);
			}
		}
		return editorState;
	}

	_setValue(editorState) {
		const { outputValueMode, setValue } = this.props;
		switch(outputValueMode) {
		case 'html': {
			setValue(stateToHTML(editorState.getCurrentContent()));
			break;
		}
		case 'raw': {
			setValue(convertToRaw(editorState.getCurrentContent()));
			break;
		}
		default:
			console.error(messages.outputValueModeError);
		}
	}

	_checkEditorHasText() {
		return this.state.editorState.getCurrentContent().hasText();
	}

	render () {
		const { label, getErrorMessage, help, placeholder, isRequired, showRequired, isFormSubmitted, plugins } = this.props;
		const { editorState } = this.state;
		const errorMessage = getErrorMessage();

		return (
			<div style={this.style.main}>
				{label ? <div style={this.style.label}>{label}{isRequired() ? ' *' : null}</div> : null}
				<div style={showRequired() && isFormSubmitted() ? this.style.editorError : this.style.editor}>
					<Editor
						editorState={editorState}
						onChange={this._onEditorChange.bind(this)}
						placeholder={placeholder}
						plugins={plugins ? plugins : []}
					/>
				</div>
				<span>{errorMessage}</span>
				{help ? <div style={this.style.help}>{help}</div> : null}
			</div>
		);
	}
}

DraftjsFormsyInput.propTypes = {
	// props recieved from formsy HOC:
	// setValue: React.PropTypes.func.isRequired,
	// getValue: React.PropTypes.func.isRequired,
	// getErrorMessage: React.PropTypes.func.isRequired,
	// isRequired: React.PropTypes.func,
	// showError: React.PropTypes.func,
	// showRequired: React.PropTypes.func.isRequired,
	// showError: React.PropTypes.func.isRequired,

	label: React.PropTypes.string,
	style: React.PropTypes.shape({
		main: stylePropType,
		label: stylePropType,
		help: stylePropType,
		editor: stylePropType,
	}),
	outputValueMode: React.PropTypes.string,
	// value: React.PropTypes.object,
	// defaultValue: React.PropTypes.object,
	placeholder: React.PropTypes.string,
	help: React.PropTypes.string,
	plugins: React.PropTypes.arrayOf(React.PropTypes.object),
};

DraftjsFormsyInput.defaultProps = {
	label: null,
	placeholder: '. . .',
	style: null,
	help: null,
	outputValueMode: 'html',
	plugins: null,
};

export default formsyHOC(DraftjsFormsyInput);
