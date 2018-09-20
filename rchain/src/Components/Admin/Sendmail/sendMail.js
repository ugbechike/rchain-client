
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input, TextArea, Select, Progress, Segment, TransitionablePortal, Header, Icon } from 'semantic-ui-react';
import { API_URL } from '../../../config';
import axios from 'axios';
import MainNav from '../Menu/mainNav';
import SideNav from '../Menu/sideNav';

class SendMail extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	subject: '',
        	message: '',
        	disabled: false,
			transition: false,
			loading: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleChange = (e) => {
    	this.setState({
    		[e.target.id]: e.target.value
    	})
    	
    }


    /** SENDING MAIL TO ALL USERS */
    handleSubmit = (e) => {
    	e.preventDefault();
    	this.setState({
			disabled: true,
			loading: true
		})
		
		const mail={
			msgHead: this.state.subject,
			msgBody: this.state.message
		} 
		axios.post(`${API_URL}/subscribe/notify`, mail)
		.then(res => {
		  console.log(res)
		  if(res){
			console.log(res);

			this.setState({
				disabled: false,
				subject: '',
				message: '',
				transition: true,
				loading: false
				
			})
		}
		})

    
    }

    handleClose = () => {
    	setTimeout(() => this.setState({transition: false}), 5000)
    }

    render() {
		let { subject, message, disabled, transition, loading } = this.state;


        return (
            <div>
                <MainNav />
              <div style={{marginTop: '120px', marginLeft: '200px'}}>

              	<TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
    	          <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
    	            <Header><Icon name="check circle outline" size="big" /></Header>
    	            <p>Message Sent successfully.</p>
    	          </Segment>
    	      	</TransitionablePortal>

              	<Form onSubmit={this.handleSubmit} style={{width: '500px', margin: 'auto'}} encType="multipart/form-data" loading={loading}>
              		
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="name">Subject</label>
    			      <Input id="subject" placeholder='Subject' value={subject} onChange={this.handleChange} />
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="message">Message</label>
    			      <TextArea id="message" placeholder='Send message' value={message} onChange={this.handleChange} />
    			    </Form.Field>
    			    <Button type='submit' disabled={disabled} >Send</Button>
    			</Form>
              </div>
              <SideNav />
          </div> 
        );
    }
}

export default withRouter(SendMail);
