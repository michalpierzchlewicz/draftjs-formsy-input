import React from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js'; // eslint-disable-line import/no-unresolved

class DraftjsFormsyInput extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			editorState: EditorState.createEmpty(),
		};
	}

	_onEditorChange(editorState) {
		this.setState({
			editorState,
		});
		console.log('_onEditorChange');
	}

	render () {
		const { editorState } = this.state;
		return (
			<Editor
				editorState={editorState}
				onChange={this._onEditorChange.bind(this)}
			/>
		);
	}
}

export default DraftjsFormsyInput;
