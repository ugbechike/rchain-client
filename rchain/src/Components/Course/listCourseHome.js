import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Image, Loader, Card, Button } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL } from '../../config';

class ListCoursesHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            courses: []
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })

        this.getLatestCourses();
    }

    getLatestCourses = () => {
        axios.get(`${API_URL}/video/sort/6`)
            .then(res => {
                this.setState({
                    courses: res.data,
                    loading: false
                })
            })
    }

    handleClick = (id) => {
        //handle course taking here
        let userId = localStorage.getItem('user');
        //handle course taking here
        if(userId){
          axios.post(`${API_URL}/users/library/add`, {user: userId, video: id})
            .then(res => {
              console.log(res);
              if(res){
                if(res.data.message == "Video added successfully to user library"){
                  this.props.history.push(`/course/${id}`)
                }else if(res.data.message == "Video already exists in your library"){
                  this.props.history.push(`/course/${id}`)
                }
              }
            })
            .then(err => {
              console.log(err)
            })
        }else {
          this.props.history.push('/login')
        }
    }

    render() {
        let { loading, courses } = this.state;

        return (
            <div>
                <Loader style={{zIndex: '1', width: '90%', margin: 'auto', marginTop: '90px', marginBottom: '0px'}} active={loading} inline='centered' />
                <Card.Group centered stackable  style={{zIndex: '0', width: '90%', margin: 'auto', marginTop: '20px'}}>

                    {
                        courses &&
                            courses.map((course) => {
                            return (
                                <Card raised key={course._id} >
                                  <Card.Content>
                                    <Image floated='right' size='mini' src={course.image} />
                                    <Card.Header>{course.name}</Card.Header>
                                    <Card.Meta></Card.Meta>
                                    <Card.Description>
                                      {course.description}
                                    </Card.Description>
                                  </Card.Content>
                                  <Card.Content extra>
                                    <div className='ui two buttons'>
                                      <Button basic style={{border:'1px solid #b35959',color: '#b35959'}} onClick={() => this.handleClick(course._id)}>
                                        Take Course
                                      </Button>
                                    </div>
                                  </Card.Content>
                                </Card>
                            )
                        })
                    }
                </Card.Group>
            </div>
        );
    }
}

export default withRouter(ListCoursesHome);
