import React, { Component } from 'react';
import { Button, Comment, Form, Header, Divider } from 'semantic-ui-react';
import Time from '../time';
import axios from 'axios';
import { API_URL } from '../../config';
import '../style.css';

class Commenting extends Component {
  constructor(props){
    super(props);

    this.state = {
      newComment: '',
      comments: [],
      loading: false
    }
  }

  componentDidMount() {
    this.getVideo();

  }

  //GET A PARTICULAR VIDEO
  getVideo = () => {
    axios.get(`${API_URL}/video/get/${this.props.videoId}`)
      .then(res => {
          this.setState({
            comments: res.data.comment,
            newComment: ''
          })
      })

  }

  handleChange = (e) => {
    this.setState({
      newComment: e.target.value
    })
  }

  //SUBMIT A PARTICULAR COMMENT
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })

    let user = localStorage.getItem('user');

    let { newComment } = this.state;
    let { videoId } = this.props;

    let commenting = {
      video: videoId,
      user_id: user,
      comment: newComment
    }

    axios.post(`${API_URL}/comment/addcomment`, commenting)
      .then(res => {
        if(res) {
          console.log(res);
          console.log(commenting)

          if(res.data){
            this.setState({
              loading: false
            }, () => this.getVideo())
          }
        }
	})
  }

  render(){
    let { comments, newComment, loading } = this.state;

    return (
        <Comment.Group style={{width: '100%', margin: 'auto', padding: '10px'}}>
          <Header>Video Comment</Header>
          <Divider />

          {
            comments &&
              comments.map((comment) => {
                return(    
                  <Comment key={comment.time} >
                    <Comment.Avatar as='a' src={comment.user_id.profile_pics} />
                    <Comment.Content>
                      <Comment.Author>{comment.user_id.username}</Comment.Author>
                      <Comment.Metadata>
                        <Time time={comment.time}/>
                      </Comment.Metadata>
                      <Comment.Text>
                        <p>
                          {comment.comment}
                        </p>
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                )
              })
          }

          <Form reply onSubmit={this.handleSubmit}>
            <Form.TextArea onChange={this.handleChange} value={newComment} />
            <Button loading={loading} content='Add Comment' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
    )
  }
}

export default Commenting;