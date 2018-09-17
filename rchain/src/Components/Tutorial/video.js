import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Responsive, Container, Header, Grid, Divider, Loader } from 'semantic-ui-react';
import Commenting from './comment';
import axios from 'axios';
import { API_URL } from '../../config';

class Video extends Component {

	state = {
		video: []
	}

	componentDidMount() {
		this.getVideo()

		window.scrollTo(0, 0);
	}

	getVideo = () => {
		axios.get(`${API_URL}/video/get/${this.props.match.params.id}`)
			.then(res => {
				this.setState({
					video: res.data
				})
			})

	}

    render () {
    	let { video } = this.state;

	    return (
	    	<div>
		    	<Responsive minWidth={Responsive.onlyTablet.minWidth} >
			      <div className='player-wrapper'>
			        <ReactPlayer
			          className='react-player'
			          url={video.video}
			          width='100%'
			          height='80%'
			          loop={true}
			          controls={true}
			          onError={() => alert('error while playing video')}
			        />
			      </div>
			      <Grid celled='internally' style={{marginTop: '0px', width: '100%'}} >
					    <Grid.Row>
						    <Grid.Column width={16}>
						        <Container  fluid textAlign="justified" style={{width: '95%'}}>
								    <Header>
								        <Header.Content>
									      	{video.name}
									      	<Divider />
									      	<Header.Subheader>
										        {video.description}
											</Header.Subheader>
									    </Header.Content>
								    </Header>
							    </Container>

							    <Container>
							    	<Commenting videoId={`${this.props.match.params.id}`} />
							    </Container>

						    </Grid.Column>
					    </Grid.Row>
					</Grid>
			    </Responsive>

			    <Responsive maxWidth={Responsive.onlyMobile.maxWidth} >
				    <div className='player-wrapper'>
				        <ReactPlayer
				          className='react-player'
				          url={video.video}
				          width='100%'
				          height='100%'
				          loop={true}
				          controls={true}
				          onError={() => alert('error while playing video')}
				        />
				    </div>

					<Grid  style={{margin: '0px', width: '100%'}}>
					    <Grid.Row columns={1}>
					      	<Grid.Column width={16}>
						        <Container  fluid textAlign="justified" style={{width: '90%'}}>
								    <Header>
								        <Header.Content>
									      	{video.name}
									      	<Divider />
									      	<Header.Subheader>
										        {video.description}
											</Header.Subheader>
									    </Header.Content>
								    </Header>
							    </Container>
						    </Grid.Column>
					    </Grid.Row>

					    <Grid.Row columns={1}>
					      	<Grid.Column width={16}>
						        <Container fluid textAlign="justified">
							    	<Commenting videoId={`${this.props.match.params.id}`} />
							    </Container>
						    </Grid.Column>
					    </Grid.Row>
					  </Grid>
			    </Responsive>
		    </div>
	    )
  }
}

export default withRouter(Video);