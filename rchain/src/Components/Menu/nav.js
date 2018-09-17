import React, {Component, Fragment} from 'react';
import { Menu, Button, Icon, Responsive, Sidebar, Image } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../config';
import logo from '../../Assets/logo_red.png';
import '../style.css';

class TopNav extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            sidebarOpened: false,
        }
    }

    handleClick = (courseID) => {
        this.props.history.push(courseID);
        window.location.reload();
    }

    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

    handleLogOut = () => {
        //handle logout
        localStorage.clear('user');
        this.props.history.push('/login');
    }

    handleSignup = () => {
        //handle signup
    }

    render() {
        let { sidebarOpened } = this.state;


        const btn = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '5px',
            marginLeft: '5px',
            width: '120px',
            border:'1px solid #b35959',
            color: '#b35959'
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
        
        return (
            <div style={{zIndex: '10'}}>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Menu style={container} >
                        <Menu.Item className="container" as={NavLink} to="/" style={{background: 'none', position: 'initial'}}>
                            <Image src={logo} size="tiny" style={{width: '150px'}}/>
                        </Menu.Item>
            
                        <Menu.Item className="container" position='right' style={{position: 'initial'}}>

                            <Button basic style={btn} animated='vertical' as={NavLink} to="/courses" >
                                <Button.Content hidden>
                                    Courses
                                </Button.Content>
                                <Button.Content visible>
                                    <Icon name='video play' />
                                </Button.Content>
                            </Button>
                            {
                                isLoggedIn('user') ?
                                    (
                                        <Fragment>
                                            <Button basic style={btn} animated='vertical' as={NavLink} to="/auth/user">
                                                <Button.Content hidden>
                                                    Dashboard
                                                </Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='user' />
                                                </Button.Content>
                                            </Button>
                                            <Button basic style={btn} animated='vertical' onClick={this.handleLogOut}>
                                                <Button.Content hidden>
                                                    Logout
                                                </Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='sign-out' />
                                                </Button.Content>
                                            </Button>
                                        </Fragment>
                                    )
                                    :
                                    (
                                        <Fragment>
                                            <Button basic style={btn} animated='vertical' as={NavLink} to='/login' >
                                                <Button.Content hidden>
                                                    Log In
                                                </Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='sign in' />
                                                </Button.Content>
                                            </Button>
                                            
                                            <Button basic style={btn} animated='vertical' as={NavLink} to='/signup' >
                                                <Button.Content hidden>
                                                    Sign Up
                                                </Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='signup' />
                                                </Button.Content>
                                            </Button>
                                        </Fragment>
                                    )
                            }
                        </Menu.Item>
                    </Menu>
                </Responsive>
                <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                    <Menu style={container} >
                        <Sidebar as={Menu} animation='slide along' inverted vertical visible={sidebarOpened} style={{background: 'rgb(88, 29, 46)'}}>
                            <Menu.Item as={Link} to="/" onClick={this.handleToggle} >Home</Menu.Item>
                            <Menu.Item as={Link} to="/courses" onClick={this.handleToggle}>Courses</Menu.Item>
                            {
                                isLoggedIn('user') ?
                                    (
                                        <Fragment>
                                            <Menu.Item as={Link} to="/auth/user" onClick={this.handleToggle} >Dashboard</Menu.Item>  
                                            <Menu.Item onClick={() => {this.handleToggle(); this.handleLogOut()}} >Logout</Menu.Item>  
                                        </Fragment>
                                    )
                                    :
                                    (
                                        <Fragment>
                                            <Menu.Item as={Link} to="/login" onClick={this.handleToggle} >Sign In</Menu.Item>
                                            <Menu.Item as={Link} to="/signup" onClick={this.handleToggle} >Sign Up</Menu.Item>
                                        </Fragment>
                                    )
                            }
                        </Sidebar>

                        <Menu.Item className="container" as={NavLink} to="/" style={{background: 'none', position: 'initial'}}>
                            <Image src={logo} size="tiny" style={{width: '100px'}}/>
                        </Menu.Item>
            
                        <Menu.Item className="container" style={{position: 'fixed', top: '2px', right: '0', width: '70%', paddingRight: '0'}}>
        
                            <Menu.Item onClick={this.handleToggle} style={{marginLeft: '0', position: 'absolute', right: '0', top: '13px'}}>
                                <Icon name='sidebar' style={{margin: '0'}} />
                            </Menu.Item>
                        </Menu.Item>
                    </Menu>
                </Responsive>
            </div>
        )
    }
}

export default withRouter(TopNav);