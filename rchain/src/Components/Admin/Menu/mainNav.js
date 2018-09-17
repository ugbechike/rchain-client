import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import {Button, Icon, Responsive, Sidebar, Image } from 'semantic-ui-react';

const handleLogout = (props) => {
  localStorage.clear('admin');
  props.history.push('/admin');
}


const btn = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '5px',
  marginLeft: '5px',
  width: '120px',
  border:'1px solid #b35959',
  color: '#b35959',
  // position: 'right'
};


const container = {
  height: '70px',
  width: '100%',
  border: 'none',
  position: 'fixed',
  zIndex: '10',
  top: '0',
  borderRadius: '0',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'rgb(255, 255, 255)'
}

const MainNav = (props) => {
  return (
    <Segment style={{position: 'fixed', top: '0px', zIndex: '10', width: '100%', borderRadius: '0', height: '80px', background: 'white'}}>
      <Menu inverted secondary  >
        <Menu.Item className="container" position='right' >
          <Button basic style={btn} position='right' animated='vertical' onClick={() => handleLogout(props)}>
            <Button.Content hidden>
              Logout
            </Button.Content>
            <Button.Content visible>
              <Icon name='sign-out' />
            </Button.Content>
          </Button>
        </Menu.Item>
      </Menu>
    </Segment>
  )
}

export default withRouter(MainNav);