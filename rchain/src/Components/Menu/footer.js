import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  List,
  Segment,
  Responsive,
  Label,
  Input,
  TransitionablePortal,
  Icon
} from 'semantic-ui-react';
import { API_URL, isLoggedIn } from '../../config';
import axios from 'axios'

import RchainBot from '../Chatbot/rchainBot';

class Footer extends Component {
  state = {
    email: '',
    loading: false,
    disabled: false,
    transition: false,
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      email: e.target.value,

    })
  }

  handleSubscribe = () => {
    this.setState({
      loading: true,
      disabled: true
    })
    const email= this.state.email
    axios.post(`${API_URL}/subscribe/add`, email)
    .then(res => {
      console.log(res)
      if(res.data.message){
        this.setState({
          email: '',
          message: res.data.message,
          loading: false,
          disabled: false,
          transition: true,

        })
      }
    })
    console.log(this.state.email)
  }

  handleClose = () => {
    setTimeout(() => this.setState({transition: false}), 5000)
  }


  render() {
    const container = {
      position: 'absolute',
      width: '100%',
      marginTop: '150px',
      backgroundColor: '#57022f',
      height: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
    let {loading, transition, message} = this.state
    return (
      <Responsive style={container}>
        <Segment vertical style={{ padding: '0px', paddingTop: '0px' }}>
              <Container>
                <Grid inverted stackable style={{width: '100%'}}>
                  <Grid.Row>

                    <Grid.Column width={5}>
                      <Header inverted as='h4' content='Popular Courses' />
                      <List link inverted>
                      <List.Item as="a" >Learn Rholang for dummies</List.Item>
                        <List.Item as="a" >Rholang programming essentials</List.Item>
                        <List.Item as="a" >Rholang smart contracts</List.Item>
                        <List.Item as="a" >RNode setup on a cloud machine</List.Item>
                      </List>
                    </Grid.Column>

                    <Grid.Column width={5}>
                      <Header inverted as='h4' content='Who we are' />
                      <List link inverted>
                        <List.Item >About Us</List.Item>
                      </List>
                    </Grid.Column>

                    <Grid.Column width={6}>
                      <Header inverted as='h4' content='Contact Us' />
                      <List link inverted>
                        {/* <List.Item as='a'>+2348103221543</List.Item> */}
                        <List.Item as='a' href="mailto:info@rchaincoop.com">info@rchaincoop.com</List.Item>
                      </List>
                      <List link inverted>
                        <List.Item >
                        <TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
                          <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
                            <Header><Icon name="check circle outline" size="big" /></Header>
                            <p>{message}</p>
                          </Segment>
                        </TransitionablePortal>
                          <Input
                            labelPosition="right"
                            value={this.state.email}
                            placeholder='email@example.com'
                            type='email'
                            onChange={this.handleChange}
                          >
                            <input />
                            <Label
                              style={{
                                cursor:'pointer',
                                color:'white',
                                border:'2px solid #b35959',
                                backgroundColor:'transparent'
                              }}
                              onClick={this.handleSubscribe}>
                              Subscribe
                            </Label>
                          </Input>
                        </List.Item>
                      </List>
                    </Grid.Column>

                  </Grid.Row>

                  <Grid.Row >
                    <Grid.Column width={16} style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <Header inverted as='h4' content={`© ${new Date().getFullYear()} All Rights Reserved`} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            <RchainBot />
      </Responsive>
    )
  }
}


export default Footer;
