import React, { Component } from 'react';
import TopNav from '../Menu/nav';
import LearnArea from './learnArea';
import PracticeArea from './practiceArea';
import { Grid, Responsive } from 'semantic-ui-react';

class Tutorial extends Component {
	componentDidMount(){
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div>
				<TopNav />
				<Responsive minWidth={Responsive.onlyTablet.minWidth}>
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
				</Responsive>
				<Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
					<LearnArea />
				</Responsive>
			</div>
		);
	}
}

export default Tutorial;
