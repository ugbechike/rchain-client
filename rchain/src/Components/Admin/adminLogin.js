import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL } from '../../config'

class AdminLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
        	email: '',
        	password: '',
            loading: false
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    handleChange = (e) => {
    	this.setState({
    		[e.target.name]: e.target.value
    	})
    }

    handleSubmit = (e) => {
    	e.preventDefault();
        this.setState({
            loading: true
        })

        let { email, password } = this.state;

        if(email.trim() == '' && password == '' ){
            alert("please input your username or password")
        }else {
            try {
                axios.post(`${API_URL}/login/admin`, {email, password})
                    .then(res => {
                        if(res.data.message == "Admin login successful"){
                            localStorage.setItem('admin', res.data.userId);
                            this.props.history.push('/admin/upload');
                        }else {

                        }

                        this.setState({
                            loading: false
                        })
                    })
            } catch (err) {
                console.log(err)
            }
        }

    }

    render() {
        let { loading } = this.state;
        const admin = localStorage.getItem('admin');

    	 const container = {
    	 	width: '500px',
    	 	margin: '200px auto'
    	 }

         const Render = admin ?
                            (<Redirect to="/admin/dashboard" />)
                            :
                            (
                                <Form style={container} onSubmit={this.handleSubmit} loading={loading}>
                    			    <Form.Field>
                    			      <label>Email</label>
                    			      <input name="email" placeholder='Email' value={this.email} onChange={this.handleChange} required />
                    			    </Form.Field>
                    			    <Form.Field>
                    			      <label>Password</label>
                    			      <input name="password" type="password" placeholder='Password' value={this.password} onChange={this.handleChange} required />
                    			    </Form.Field>
                    			    <Button type='submit' inverted primary>Login</Button>
                    		    </Form>
                            )

        return (
            <div>
                {
                    Render
                }
            </div>
        );
    }
}

export default withRouter(AdminLogin);
