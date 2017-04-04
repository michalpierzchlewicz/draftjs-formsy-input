import React from 'react';
import ReactDOM  from 'react-dom';
import { Form } from 'formsy-react';
import DraftjsFormsyInput from 'draftjs-formsy-input';
import { convertToRaw, ContentState } from 'draft-js'; // eslint-disable-line import/no-unresolved
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin'; // eslint-disable-line import/no-unresolved
import {
	ItalicButton,
	BoldButton,
	UnderlineButton,
	CodeButton,
	HeadlineOneButton,
	HeadlineTwoButton,
	HeadlineThreeButton,
	UnorderedListButton,
	OrderedListButton,
	BlockquoteButton,
	CodeBlockButton,
} from 'draft-js-buttons'; // eslint-disable-line import/no-unresolved

const editorStyle = {
	main: {
		padding: '20px 0',
	},
};

const rawState = convertToRaw(ContentState.createFromText('Default raw value'));

class App extends React.Component {

	constructor(props) {
		super(props);
		this.inlineToolbarPlugin = createInlineToolbarPlugin({
			structure: [
				BoldButton,
				ItalicButton,
				UnderlineButton,
				CodeButton,
				Separator,
				HeadlineOneButton,
				HeadlineTwoButton,
				HeadlineThreeButton,
				Separator,
				UnorderedListButton,
				OrderedListButton,
				Separator,
				BlockquoteButton,
				CodeBlockButton,
			]
		});
		this.InlineToolbar = this.inlineToolbarPlugin.InlineToolbar;
	}

	_validSubmit(data) {
		console.log('data', data);
	}

	render () {

		const InlineToolbar = this.InlineToolbar;

		return (
			<div>
				<Form
					onValidSubmit={this._validSubmit.bind(this)}
					onInvalidSubmit={data => (console.log('onInvalidSubmit data', data))}
				>
					<DraftjsFormsyInput
						name="normal"
						label="Example input:"
						help="This is a normal input help text."
						style={editorStyle}
					/>
					<DraftjsFormsyInput
						name="required"
						label="Required input:"
						help="This is a required input."
						required
						style={editorStyle}
					/>
					<DraftjsFormsyInput
						name="defaultValueHTML"
						label="Default html value input:"
						help="This is an input with default html value."
						outputValueMode="html"
						value="<p>Default html value</p>"
						style={editorStyle}
					/>
					<DraftjsFormsyInput
						name="defaultValueRaw"
						label="Default raw value input:"
						help="This is an input with default raw value."
						outputValueMode="raw"
						value={rawState}
						style={editorStyle}
					/>
					<DraftjsFormsyInput
						name="inlineToolbar"
						label="Input with Inline Toolbar:"
						help="Select text to show options."
						plugins={[this.inlineToolbarPlugin]}
						style={editorStyle}
					/>
					<InlineToolbar />
					<h5>After submit - check console.</h5>
					<button type="submit">SUBMIT</button>
				</Form>
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));
