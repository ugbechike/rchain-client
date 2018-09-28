import React, { Component } from 'react';
import TopNav from '../Menu/nav';
import LearnArea from './learnArea';
import PracticeArea from './practiceArea';
import { Grid, Responsive } from 'semantic-ui-react';
import { API_URL } from '../../config';
import axios from 'axios'

class Tutorial extends Component {
	state={
		category: ''
	}
	componentDidMount(){
		window.scrollTo(0, 0);
		this.getVideo()
	}

	getVideo = () => {
		axios.get(`${API_URL}/video/get/${this.props.match.params.id}`)
			.then(res => {
				this.setState({
					category: res.data.categoryIn
				})
				console.log(res.data)
			})

	}


	render() {
		let { category } = this.state
		return (
			<div>
				<TopNav />
				<Responsive minWidth={Responsive.onlyTablet.minWidth}>
					<Grid>
						{
							category && 
								category == 'Rholang' ?
									<Grid.Row>
										<Grid.Column width={7}>
												<LearnArea />
										</Grid.Column>
										<Grid.Column width={9} style={{padding: '0'}}>
											<PracticeArea />
										</Grid.Column>
									</Grid.Row>
									:	
									<Grid.Row>
										<Grid.Column width={16}>
												<LearnArea />
										</Grid.Column>
									</Grid.Row>
						} 
						
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
