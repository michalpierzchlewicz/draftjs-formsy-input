import React from 'react';
import ReactDOM  from 'react-dom';
import { Form } from 'formsy-react';
import DraftjsFormsyInput from 'draftjs-formsy-input';
import { convertToRaw, ContentState } from 'draft-js'; // eslint-disable-line import/no-unresolved

const editorStyle = {
	main: {
		padding: '20px 0',
	},
};

const rawState = convertToRaw(ContentState.createFromText('Default raw value'));

class App extends React.Component {

	_validSubmit(data) {
		console.log('data', data);
	}

	render () {
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
					<h5>After submit - check console.</h5>
					<button type="submit">SUBMIT</button>
				</Form>
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));
