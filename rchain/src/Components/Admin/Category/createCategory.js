import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input, Segment, TransitionablePortal, Header, Icon } from 'semantic-ui-react';
import { API_URL } from '../../../config';
import axios from 'axios';
import MainNav from '../Menu/mainNav';
import SideNav from '../Menu/sideNav';

class CreateCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	name: '',
        	disabled: false,
            transition: false
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    handleChange = (e) => {
    	this.setState({
    		[e.target.id]: e.target.value
    	})
    }


    /**USING A DIFFERENT API CALL FOR CREATING CATEGORY*/
    handleSubmit = (e) => {
    	e.preventDefault();
    	this.setState({
    		disabled: true
    	})

    	let { name } = this.state;

    	
    	
        try {
            // statements
        	axios({
    		    method: 'post',
    		    url: `${API_URL}/category/add`,
    		    data: {name}
            })
    		.then(res => {
                console.log(res)
                if(res.data){
        			this.setState({
        				disabled: false,
                        transition: true,
        			})
                }
    		})
            .then(err => {
                this.setState({
                    disabled: false,
                })
            })
        } catch(e) {
            // statements
            console.log(e);
            this.setState({
                name: '',
                disabled: false,
                transition: false
            })
        }


    }

    handleClose = () => {
        setTimeout(() => this.setState({transition: false}), 5000)
    }

    render() {
    	let { name, disabled, transition } = this.state;


        return (
            <div>
                {/* <MainNav /> */}
              <div style={{marginTop: '120px', marginLeft: '200px'}}>

                <TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
                  <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
                    <Header><Icon name="check circle outline" size="big" /></Header>
                    <p>Category was created successfully.</p>
                  </Segment>
                </TransitionablePortal>

              	<Form onSubmit={this.handleSubmit} style={{width: '500px', margin: 'auto'}} >
                  
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="name">Category Name</label>
    			      <Input id="name" placeholder='name' value={name} onChange={this.handleChange} required />
    			    </Form.Field>
    			    <Button type='submit' disabled={disabled}>Create</Button>
    			</Form>
              </div>
              {/* <SideNav /> */}
            </div>  
        );
    }
}

export default withRouter(CreateCategory);
