import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Grid, Card, Image } from 'semantic-ui-react';
import TopNav from '../Menu/nav';
import Footer from '../Menu/footer';
import { API_URL } from '../../config';
import axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      library: [],
      loadingUser: false,
      loadingLibrary: false
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let userId = localStorage.getItem('user');
    this.setState({
      loadingUser: true,
      loadingLibrary: true
    })

    this.getUser(userId);
    this.getUserLibrary(userId);
  }

  getUser = (id) => {
    axios.get(`${API_URL}/users/find?_id=${id}`)
      .then(res => {
        if(res){
          this.setState({
            user: res.data.user,
            loadingUser: false
          })
        }
      })
      .then(err => {
        console.log(err)
      })
  }

  getUserLibrary = (id) => {
    axios.get(`${API_URL}/users/library/view/${id}`)
      .then(res => {
        if(res){
          this.setState({
            library: res.data.library,
            loadingLibrary: false
          })
        }
      })
      .then(err => {
        console.log(err)
      })
  }

  render() {
    let { user, library, loadingUser, loadingLibrary } = this.state;
    let container = {
      marginTop: '80px'
    }

    return (
      <div>
        <TopNav />
        <Responsive minWidth={Responsive.onlyTablet.minWidth} style={container}>
          <Grid columns='2' divided inverted padded>
            <Grid.Row>
              <Grid.Column width='3' style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', fontSize: '20px', fontWeight: '500'}}>
                <Image src={user.profile_pics} style={{width: '160px', height: '160px', border: '5px solid lightblue', padding: '3px'}} circular/>
                {user.username}
              </Grid.Column>
              <Grid.Column width='13'>
                <Card.Group centered >
                    {
                      library.videos &&
                        library.videos.length > 0 &&
                            library.videos.map((video, index) => {
                                return (
                                    <Card key={`${video._id}-${index}`} as={Link} to={`/course/${video._id}`}>
                                      <Card.Content
                                        header={video.name}
                                        description={video.description}
                                      />
                                    </Card>
                                )
                            })
                    }
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>

        <Responsive maxWidth={Responsive.onlyMobile.maxWidth} style={container}>
          <Grid columns='1' inverted padded>
            <Grid.Row style={{display: 'flex', justifyContent: 'center'}}>
                <Grid.Column width='16' style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', fontSize: '17px', fontWeight: '500'}}>
                    <Image src={user.profile_pics} style={{width: '150px', height: '150px', border: '3px solid lightblue', padding: '3px'}} circular/>
                    {user.username}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{display: 'flex', justifyContent: 'center'}}>
              <Grid.Column width='16'>
                <Card.Group  centered>
                  {
                    library.videos &&
                      library.videos.length > 0 &&
                          library.videos.map((video, index) => {
                              return (
                                  <Card key={`${video._id}-${index}`} as={Link} to={`/course/${video._id}`}>
                                    <Card.Content
                                      header={video.name}
                                      description={video.description}
                                    />
                                  </Card>
                              )
                          })
                  }
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Footer />
      </div>
    );
  }
}

export default User;
