
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input, TextArea, Select, Progress, Segment, TransitionablePortal, Header, Icon } from 'semantic-ui-react';
import { API_URL } from '../../../config';
import axios from 'axios';
import MainNav from '../Menu/mainNav';
import SideNav from '../Menu/sideNav';

class UploadContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	name: '',
        	description: '',
        	video: null,
            transcript: null,
			tutorial: [],
			category: '',
			categories:[],
			categoryid: '',
        	progress: 0,
        	disabled: false,
        	transition: false
        }
    }

    componentDidMount() {
		window.scrollTo(0, 0);
		axios.get(`${API_URL}/category/get`)
		.then(res => {
			if(res.data){
				this.setState({
					categories: res.data
				})
			}
		})
    }

    handleChange = (e) => {
    	this.setState({
    		[e.target.id]: e.target.value
    	})
    	
	}
	
	handleOptionChange = (e) => {
    	this.setState({
			categoryid: e.target.value,
		})
		
    }

    handleVideoChange = (e) => {
    	this.setState({
    		video: e.target.files[0]
    	})
    }

    handlePdf = (e) => {
        this.setState({
            transcript: e.target.files[0]
        })
    }


    /** USING A DIFFERENT API CALL FOR UPLOADING VIDEO */
    handleSubmit = (e) => {
    	e.preventDefault();
    	this.setState({
    		disabled: true
    	})

    	let { name, description, video, transcript, categoryid } = this.state;

    	let tutorial = new FormData();
    	tutorial.append('name', name);
    	tutorial.append('description', description);
    	tutorial.append('video', video);
		tutorial.append('transcript', transcript);
		tutorial.append('category', categoryid)

    	try {
    		// statements
	    	axios({
			  	method: 'post',
			  	url: `${API_URL}/video/add`,
			  	data: tutorial,
			  	headers: {
			  		'Content-Type': 'multipart/form-data'
			  	},
				onUploadProgress: (progressEvent) => {
			    	const { loaded, total } = progressEvent;
			    	this.setState({
			    		progress: Math.round((loaded/total) * 100)
			    	})
			  	}
			})
			.then(res => {
                if(res){
                    console.log(res);

    				this.setState({
    					disabled: false,
    					name: '',
    					description: '',
    					video: null,
    					category: '',
    					progress: 0,
    					transition: true
    				})
                }
			})
			.then(err => {
				console.log(err);
				this.setState({
					disabled: false,
					progress: 0
				})
			})
    	} catch(e) {
    		// statements
    		console.log(e);
    		this.setState({
				disabled: false,
				name: '',
				description: '',
				video: null,
				course: '',
				progress: 0,
				transition: true
			})
    	}


    }

    handleClose = () => {
    	setTimeout(() => this.setState({transition: false}), 5000)
    }

    render() {
		let { name, description, course, categories, progress, disabled, transition } = this.state;


        return (
            <div>
                <MainNav />
              <div style={{marginTop: '120px', marginLeft: '200px'}}>

              	<TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
    	          <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
    	            <Header><Icon name="check circle outline" size="big" /></Header>
    	            <p>The video upload was successful.</p>
    	          </Segment>
    	      	</TransitionablePortal>

              	<Form onSubmit={this.handleSubmit} style={{width: '500px', margin: 'auto'}} encType="multipart/form-data">
              		{
              			disabled &&
              				<Progress percent={progress} indicating progress size="small" />
    				}
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="name">Video Name</label>
    			      <Input id="name" placeholder='name' value={name} onChange={this.handleChange} />
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="description">Video Description</label>
    			      <TextArea id="description" placeholder='Tell us more about this video' value={description} onChange={this.handleChange} />
    			    </Form.Field>

					<Form.Field disabled={disabled}>
    			      <label htmlFor="course">Category</label>
    			      <select id="course" value={this.state.categoryid} onChange={this.handleOptionChange}>
                        <option>Choose...</option>

    			      	{
    			      		categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)
    			      	}

    		          </select>
    			    </Form.Field>


    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="video">Cover video</label>
    			      <Input accept=".mp4, .avi. .flv" id="video" placeholder='upload video only' type="file" onChange={this.handleVideoChange}/>
    			    </Form.Field>
                    <Form.Field disabled={disabled}>
    			      <label htmlFor="pdf">Video Document</label>
    			      <Input accept=".pdf" id="pdf" placeholder='upload pdf files only' type="file" onChange={this.handlePdf}/>
    			    </Form.Field>
    			    <Button type='submit' disabled={disabled} >Create</Button>
    			</Form>
              </div>
              <SideNav />
          </div> 
        );
    }
}

export default withRouter(UploadContent);
