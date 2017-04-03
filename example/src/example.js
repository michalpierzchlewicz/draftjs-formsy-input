import React from 'react';
import ReactDOM  from 'react-dom';
import { Form } from 'formsy-react';
import DraftjsFormsyInput from 'draftjs-formsy-input';

const editorStyle = {
	main: {
		padding: '20px 0',
	},
};

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
						name="testInput"
						label="Example input:"
						help="This is input help text."
						style={editorStyle}
					/>
					<DraftjsFormsyInput
						name="testInput2"
						label="Example input 2:"
						help="This is input help text."
						required
						style={editorStyle}
					/>
					<button type="submit">SUBMIT</button>
				</Form>
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));
