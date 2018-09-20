import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Dimmer, Loader, Image, Icon, Grid, List, Form, Input, TextArea, Progress, TransitionablePortal, Segment, Header } from 'semantic-ui-react';
import { API_URL } from '../../../config'
import axios from 'axios';
import MainNav from '../Menu/mainNav';
import SideNav from '../Menu/sideNav';

class AllCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	courses: [],
        	courseVideo: [],
        	loading: false,
        	deleting: false,
        	loadVideo: false,
        	disabled: false,
        	progress: 0,
        	name: '',
        	description: '',
        	video: null,
        	courseId: '',
        	transition: false,
        	showForm: false,
			showVideo: false,
			searchLoad: false
        }
    }

    componentDidMount() {
    	this.setState({
    		loading: true
    	})

    	this.getAllCourses();

    	window.scrollTo(0, 0);
    }

    handleChange = (e) => {
    	this.setState({
    		[e.target.id]: e.target.value
    	})
    	
    }

    handleVideoChange = (e) => {
    	this.setState({
    		video: e.target.files[0]
    	})
    }

    getAllCourses = () => {
    	try {
    		// statements
	    	axios.get(`${ API_URL }/video/get`)
	    		.then(res => {
	    			if(res.data){
		    			this.setState({
		    				courses: res.data,
		    				loading: false
		    			})
	    			}else {
	    				alert('Error in network connection, try again');
	    				this.setState({
	    					loading: false
	    				})
	    			}
	    		})
    	} catch(e) {
    		// statements
    		this.setState({
	    		loading: false
	    	})
    		console.log(e);
    	}

    }

    // handleCourseVideo = (id) => {
    // 	console.log('clicked');
    // 	this.setState({
    // 		loadVideo: true,
    // 		showForm: false,
    // 		showVideo: true
    // 	})

    // 	try {
    // 		// statements
	//     	axios.get(`video/get/${id}`)
	//         .then(res => {
	//         	if(res.data){
	// 	          this.setState({
	// 	          	courseVideo: res.data.videos,
	// 	          	loadVideo: false
	// 	          })
	//         	}else {
	//         		alert('Error in network connection, try again');
	//         		this.setState({
	//         			loadVideo: false
	//         		})
	//         	}
	//         });
    // 	} catch(e) {
    // 		// statements
    // 		console.log(e);
    // 	}

    // }

    handleCourseEdit = (id) => {
    	console.log(id)
    	this.setState({
    		courseId: id,
    		showForm: true,
    		showVideo: false
    	})

    	axios.get(`${ API_URL }/video/get/${id}`)
    		.then(res => {
    			if(res.data){
    				this.setState({
    					name: res.data.name,
    					description: res.data.description
    				})
    			}else {
    				alert('Error in network connection, try again');
    			}
    		})
    }

    handleCourseDelete = (id) => {
    	let userid = localStorage.getItem('admin');
    	this.setState({
    		deleting: true
    	})

    	try {
    		// statements
	    	axios.get(`${API_URL}/video/delete/${id}/${userid}`)
	        .then(res => {
				console.log(res)
	        	if(res.data){
		          this.getAllCourses();

				}
				this.setState({
					deleting: false
				})
				
				
	        });
    	} catch(e) {
    		// statements
			console.log(e);
    	}

    }

    handleVideoDelete = (id) => {
    	let userid = JSON.parse(localStorage.getItem('user'));

    	try {
    		// statements
	    	axios.post(`${API_URL}/video/delete/${id}`, {user: userid[0]})
	    		.then(res => {
	    			if(res.data){
		    			this.handleCourseVideo(id);
	    			}else {
	    				alert('Error in network connection, try again');
	    			}
	    		})
    	} catch(e) {
    		// statements
    		console.log(e);
    	}

    }

    /**USING A DIFFERENT API CALL FOR CREATING 	COURSE*/
    handleFormSubmit = (e) => {
    	e.preventDefault();
    	this.setState({
    		disabled: true
    	})

    	let { name, description, video, courseId } = this.state;

    	let editedCourse = new FormData();
    	editedCourse.append('name', name);
    	editedCourse.append('description', description);
    	editedCourse.append('video', video);

    	try {
    		// statements
	    	axios({
			  	method: 'post',
			  	url: `${API_URL}/video/edit/${courseId}`,
			  	data: editedCourse,
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent) => {
			    	const { loaded, total } = progressEvent;
			    	this.setState({
			    		progress: Math.round((loaded/total) * 100)
			    	}, () => console.log((loaded/total)*100))
				}
			})
			.then(res => {
                if(res){
                	this.getAllCourses();

    				this.setState({
    					disabled: false,
    					transition: true,
    					name: '',
    		        	description: '',
    		        	video: null,
    				})
                }else {
                    alert('Error in network connection, try again');
                }
			})
			.then(err => {
				console.log(err);
				this.setState({
					disabled: false,
					name: '',
		        	description: '',
		        	video: null
				})
			})
    	} catch(e) {
    		// statements
    		console.log(e);
    		this.setState({
    			name: '',
	        	description: '',
	        	video: null,
	        	progress: 0,
	        	disabled: false,
	        	transition: false
    		})
    	}


	}
	
	handleSearch = (e) => {
        this.setState({
            searchLoad: true
        })
        if(e.target.value.trim() == ''){
            this.getAllCourses();

            this.setState({
                searchLoad: false
            })
        }else {
            axios.get(`${API_URL}/video/search/${e.target.value}`)
                .then(res => {
                    if(res.data){
                        this.setState({
                            courses: res.data,
                            searchLoad: false
                        })
                    }else {
                        alert('Error in network connection, try again');
                    }
                })
        }

    }



    handleClose = () => {
    	setTimeout(() => this.setState({transition: false}), 5000)
    }

    render() {
    	let { searchLoad, courses, loading, deleting, courseVideo, loadVideo, name, description, showForm, disabled, progress, transition, showVideo } = this.state;

        return (
        	<div>
	        	<MainNav />
	            <div style={{marginTop: '90px', marginLeft: '160px'}}>
				<Input loading={searchLoad} fluid onChange={this.handleSearch} icon='video' iconPosition='left' placeholder='Search videos...' style={{width: '290px', margin: 'auto', marginBottom: '15px'}}/>

		            <Dimmer active={loading} inverted>
		                <Loader indeterminate>Getting Courses</Loader>
		            </Dimmer>
		            <Dimmer active={deleting} inverted>
		                <Loader indeterminate>Deleting Course</Loader>
		            </Dimmer>



		            <Grid columns={2}>
				      <Grid.Column width={10}>
				        
			            <Table color='blue' structured selectable style={{width: '100%', marginTop: '10px'}} celled striped>
					        <Table.Header>
					          <Table.Row>
					            <Table.HeaderCell>Image</Table.HeaderCell>
					            <Table.HeaderCell>Name</Table.HeaderCell>
					            <Table.HeaderCell>Description</Table.HeaderCell>
					            <Table.HeaderCell></Table.HeaderCell>
					            <Table.HeaderCell></Table.HeaderCell>
					          </Table.Row>
					        </Table.Header>

					        <Table.Body>

					        {
					        	courses &&
						        	courses.map((course) => {
						        		return (
								          <Table.Row key={course._id} style={{cursor: 'pointer'}} >
								            <Table.Cell onClick={() => this.handleCourseVideo(course._id)}>
								            	<Image src={course.image} size="tiny" />
								            </Table.Cell>
								            <Table.Cell onClick={() => this.handleCourseVideo(course._id)}>{course.name}</Table.Cell>
								            <Table.Cell>{course.description}</Table.Cell>
								            <Table.Cell onClick={() => this.handleCourseEdit(course._id)}>
								            	<Icon name="edit outline" size="big" color="green" />
								            </Table.Cell>
								            <Table.Cell onClick={() => this.handleCourseDelete(course._id)}>
								            	<Icon name="trash alternate outline" size="big" color="red" />
								            </Table.Cell>
								          </Table.Row>
						        		)
						        	})
					        }
					        </Table.Body>
					    </Table>
				        
				      </Grid.Column>
				      <Grid.Column width={6}>
				      	<Dimmer active={loadVideo} inverted style={{zIndex: '0'}}>
				      		<Loader indeterminate style={{position: 'absolute', top: '150px'}}>Getting Videos</Loader>
				      	</Dimmer>
				      	<Grid.Row>
					        <List divided verticalAlign='middle'>
							    {
							    	showVideo &&
							    	courseVideo &&
							    		courseVideo.length > 0 ?
								    		courseVideo.map((video) => {
								    			return (
								    				<List.Item key={video._id}>
												      <List.Content floated='right'>
												        <Icon style={{cursor: 'pointer'}} name="trash" color="red" onClick={() => this.handleVideoDelete(video._id)} />
												      </List.Content>
												      <Icon name='video play' size="big" />
												      <List.Content>{video.name}</List.Content>
												    </List.Item>
								    			)
								    		})
								    		:
								    		(<div>{showVideo && 'No videos yet for this course'}</div>)
							    }
							</List>
				      	</Grid.Row>
				      	<Grid.Row>

				      		<TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
			    	          <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
			    	            <Header><Icon name="check circle outline" size="big" /></Header>
			    	            <p>Course was created successfully.</p>
			    	          </Segment>
			    	      	</TransitionablePortal>

				      		{
				      			showForm &&
						      		<Form onSubmit={this.handleFormSubmit} style={{width: '500px', margin: 'auto', padding: '10px', marginTop: '10px'}} encType="multipart/form-data">
					              		{
					              			disabled &&
					              				<Progress percent={progress} indicating progress size="small" />
					    				}
					    			    <Form.Field disabled={disabled}>
					    			      <label htmlFor="name">Course Name</label>
					    			      <Input id="name" placeholder='name' value={name} onChange={this.handleChange} />
					    			    </Form.Field>
					    			    <Form.Field disabled={disabled}>
					    			      <label htmlFor="description">Course Description</label>
					    			      <TextArea id="description" placeholder='Tell us more about this category' value={description} onChange={this.handleChange} />
					    			    </Form.Field>
					    			    <Form.Field disabled={disabled}>
					    			      <label htmlFor="video">Tutorial Video</label>
					    			      <Input accept=".mp4, .mkv, .mp3, .avi" id="video" placeholder='upload image only' type="file" onChange={this.handleVideoChange}/>
					    			    </Form.Field>
					    			    <Button type='submit' disabled={disabled}>Edit Course</Button>
					    			</Form>
				      		}
				      	</Grid.Row>
				      </Grid.Column>
				    </Grid>
	            </div>
	            <SideNav />
            </div>
        );
    }
}

export default AllCourses;
