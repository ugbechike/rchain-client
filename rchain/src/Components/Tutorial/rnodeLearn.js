import React, { Component } from 'react';
import RnodeVideo from './rnodeVideo';
import Comment from './comment';

class RnodeLearn extends Component {
	render() {
		return (
			<div style={{marginTop: '70px', overFlowY: 'scroll'}}>
				<RnodeVideo />
			</div>
		);
	}
}

export default RnodeLearn;
