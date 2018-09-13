import React, { Component } from 'react';
import TopNav from '../Menu/nav';
import LearnArea from './learnArea';
import PracticeArea from './practiceArea';
import { Grid } from 'semantic-ui-react';

class Tutorial extends Component {
	componentDidMount(){
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div>
				<TopNav />
					<Grid>
					    <Grid.Row>
					      <Grid.Column width={7}>
						      	<LearnArea />
					      </Grid.Column>
					      <Grid.Column width={9} style={{padding: '0'}}>
					        	<PracticeArea />
					      </Grid.Column>
					    </Grid.Row>
					</Grid>
			</div>
		);
	}
}

export default Tutorial;
