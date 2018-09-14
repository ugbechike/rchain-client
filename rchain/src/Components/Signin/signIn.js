import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Button, Form, Icon, Responsive, Input, Message } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { API_URL, isLoggedIn } from '../../config';
import axios from 'axios';
import Footer from '../Menu/footer';
import TopNav from '../Menu/nav';


class SignIn extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        email: '',
        password: '',
        user: {},
        activeItem: 'Log In',
        loading: false,
        visible: true,
        loggedIn: false,
        error: {}
      }
    }

    componentDidMount(){
      window.scrollTo(0, 0);
    }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });

      };
    
      handleSubmit = (e) => {
        e.preventDefault();

        const { email, password, user, error } = this.state;

        this.setState({
          loading: true
        })
    

        /**MAKE A REQUEST TO THE SERVER */
    
        if(email.trim() == '' || password == ''){
          this.setState({
            loading: false,
            visible: false
          })

          error.message = 'password is required'

        }else {

            /**REVIEW THIS TO HANDLE EVERY LOGIN REQUEST */

            axios.post(`${API_URL}/login`, {email: email.trim(),password})
              .then(res => {

                if(res.data.message == "Login successful"){
                  console.log(res)
                  localStorage.setItem('user', res.data.userId)

                  this.setState({
                    email: '',
                    password: '',
                    loading: false
                  })
                }else {
                  error.message = "Incorrect username or password"
                  this.setState({
                    loading: false,
                    visible: false
                  })
                }

              })

        }
      }

      /**   HANDLE ERROR MESSAGE FOR LOGIN   */
      handleDismiss = () => {
        this.setState({ visible: true })
      }

    render() {
        const { activeItem, email, password, loading, error, visible } = this.state;

        if(isLoggedIn('user')){
          this.props.history.push('/');
        }

        const container = {
            width: '500px',
            margin: 'auto',
            paddingTop: '150px',
            height: '600px'
        };

        const containerMobile = {
          width: '350px',
          margin: 'auto',
          paddingTop: '150px',
          height: '600px'
        }
        const menu = {
            width: '50%'
        };

        const btn = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            zIndex: '0'
        };

        const formContainer = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px'
        }


        return (
            <div>
              <TopNav />
              <Responsive style={container}  minWidth={Responsive.onlyTablet.minWidth}>
                {
                  error && (
                    <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                      <Message.Header>Sorry, you can't log in with this account</Message.Header>
                      <p>{error.message}</p>
                    </Message>
                  )
                }
                <Menu attached='top' tabular>
                    <Menu.Item 
                        style={menu}
                        name='Log In' 
                        active={activeItem === 'Log In'} 
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        style={menu}
                        name='Sign Up'
                        active={activeItem === 'Sign Up'}
                        as={Link}
                        to="/signup"
                    />
                </Menu>
                <Segment attached='bottom'>
                    <Form loading={loading} style={formContainer} onSubmit={this.handleSubmit} >
                        <Form.Field style={{width: '90%'}} >
                            <Input 
                            id="email" 
                            placeholder='Email' 
                            type="email" 
                            onChange={this.handleChange} 
                            value={email}
                            required 
                             
                            />
                        </Form.Field>

                        <Form.Field style={{width: '90%'}} >
                            <Input 
                            id="password" 
                            placeholder='Password' 
                            type="password" 
                            onChange={this.handleChange} 
                            value={password} 
                             
                            />
                        </Form.Field>
                        <Button basic color='red' style={btn} animated='vertical'  >
                          <Button.Content hidden>
                              Log In
                          </Button.Content>
                          <Button.Content visible>
                              <Icon name='sign in' />
                          </Button.Content>
                        </Button>
                        <p>Forgot password? click<Link to='/reset'> here</Link></p>
                    </Form>
                </Segment>
              </Responsive>
              <Responsive style={containerMobile} {...Responsive.onlyMobile} >
                {
                  error && (
                    <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                      <Message.Header>We're sorry you can't log in with this account</Message.Header>
                      <p>{error.message}</p>
                    </Message>
                  )
                }
                <Menu attached='top' tabular>
                    <Menu.Item 
                        style={menu}
                        name='Log In' 
                        active={activeItem === 'Log In'} 
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        style={menu}
                        name='Sign Up'
                        active={activeItem === 'Sign Up'}
                        as={Link}
                        to="/signup"
                    />
                </Menu>
                <Segment attached='bottom'>
                    <Form loading={loading} style={formContainer} onSubmit={this.handleSubmit} >
                        <Form.Field style={{width: '90%'}} >
                            <Input 
                            id="email" 
                            placeholder='Email' 
                            type="email" 
                            onChange={this.handleChange} 
                            value={email} 
                            required 
                            />
                        </Form.Field>
                        <Form.Field style={{width: '90%'}} >
                            <Input 
                            id="password" 
                            placeholder='Password' 
                            type="password" 
                            onChange={this.handleChange} 
                            value={password} 
                            required 
                            />
                        </Form.Field>
                        <Button basic color='red' style={btn} animated='vertical'  >
                          <Button.Content hidden>
                              Log In
                          </Button.Content>
                          <Button.Content visible>
                              <Icon name='sign in' />
                          </Button.Content>
                        </Button>
                        <p>Forgot password? click<Link to='/reset'> here</Link></p>
                    </Form>
                </Segment>
            </Responsive>
           <Footer />
          </div>
        )
    }
}
export default withRouter(SignIn);

