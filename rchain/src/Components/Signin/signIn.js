import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Button, Form, Icon, Responsive, Input, Message } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';


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
        loggedIn: false
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

        const { email, password, user } = this.state;

        let trimEmail = email.trim();

        this.setState({
          loading: true
        })
    

        /**MAKE A REQUEST TO THE SERVER */
    
        if(email.trim() == '' || password == ''){
          console.log('email or password is required');
        }else {

            /**REVIEW THIS TO HANDLE EVERY LOGIN REQUEST */

            axios.post(`https://ogenetv.herokuapp.com/users/login`, {email: email.trim(),password})
            .then(res => {
                    console.log(res)
                // if(res.data){
                //   //ONLY USE RES FOR SUCCESS AND RES.RESPONSE FOR ERROR HANDLING
                //   if(res.response){
                //     this.setState({
                //       error: 'Please register an account or use valid details to login',
                //       visible: false
                //     })
                //   }else if(res.data){
                //     let user = [res.data.message.passport.user, res.data.isAdmin];
                //     localStorage.setItem('user', JSON.stringify(user));
                //         console.log(user)
                //     this.setState({
                //       loggedIn: true
                //     });

                //     this.props.history.push("/auth/user");
                //   }
                // }else {
                //   alert('Error in network connection, try again');
                // }

                this.setState({
                  email: '',
                  password: '',
                  loading: false
                })
            })

        }
      }

      /**   HANDLE ERROR MESSAGE FOR LOGIN   */
      handleDismiss = () => {
        this.setState({ visible: true })
      }

    render() {
        const { activeItem, email, password, loading, error, visible } = this.state;

        // if(isLoggedIn('user')){
        //   this.props.history.push('/auth/user');
        // }

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
              
              <Responsive style={container}  minWidth={Responsive.onlyTablet.minWidth}>
                {
                  error && (
                    <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                      <Message.Header>Sorry, you can't log in with this account</Message.Header>
                      <p>{error}</p>
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
              <Responsive style={containerMobile} {...Responsive.onlyMobile} >
                {
                  error && (
                    <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                      <Message.Header>We're sorry you can't log in with this account</Message.Header>
                      <p>{error}</p>
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
                    </Form>
                </Segment>
            </Responsive>
           
          </div>
        )
    }
}
export default withRouter(SignIn);

