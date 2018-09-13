import React, { Component } from 'react';
import Video from './video';
import Comment from './comment';

class LearnArea extends Component {
	render() {
		return (
			<div style={{marginTop: '70px', overFlowY: 'scroll'}}>
		        <Video />
			</div>
		);
	}
}

export default LearnArea;
