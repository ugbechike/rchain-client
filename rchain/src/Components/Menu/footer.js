import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  List,
  Segment,
  Responsive, 
  Label,
  Input
} from 'semantic-ui-react';

class Footer extends Component {
  state = {
    email: ''
  }

  handleChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleSubscribe = () => {
    console.log(this.state.email)
  }

  render() {
    const container = {
      position: 'absolute',
      width: '100%',
      marginTop: '150px',
      backgroundColor: '#57022f',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
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
                        <Input labelPosition="right" value={this.state.email}  placeholder='email@example.com'  type='email' onChange={this.handleChange}>
                          <input />
                          <Label style={{cursor:'pointer', color:'white', border:'2px solid #b35959', backgroundColor:'transparent' }} onClick={this.handleSubscribe}>Subscribe</Label>
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
      </Responsive>
    )
  }
}


export default Footer;