var React = require('react');
var ReactDOM = require('react-dom');
var DraftjsFormsyInput = require('draftjs-formsy-input');

var App = React.createClass({
	render () {
		return (
			<div>
				<DraftjsFormsyInput />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
