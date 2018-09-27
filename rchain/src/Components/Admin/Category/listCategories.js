import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Table, Loader, Dimmer, Card, Image, Grid, Form, Input, Progress, TextArea, TransitionablePortal, Segment, Header, Icon } from 'semantic-ui-react';
import { API_URL } from '../../../config';
import axios from 'axios';
import MainNav from '../Menu/mainNav';
import SideNav from '../Menu/sideNav';
import CreateCategory from './createCategory';

class ListCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
          category: [],
          categoryId: '',
          loading: false,
          deleting: false,
          disabled: false,
          progress: 0,
          name: '',
          loadEdit: false,
          transition: false
        }
    }

    componentDidMount() {
      this.setState({
        loading: true
      })

      this.getAllCategories();

      window.scrollTo(0, 0);
    }

    getAllCategories = () => {
      axios.get(`${API_URL}/category/get`)
        .then(res => {
          if(res.data){
              console.log(res)
            this.setState({
              category: res.data,
              loading: false,
              deleting: false
            })
          }else {
            this.setState({
              loading: false
            })
          }
        });
    }

    handleShowEdit = (id) => {
      this.setState({
        loadEdit: true,
        categoryId: id
      })

      axios.get(`${API_URL}/category/edit/${id}`)
        .then(res => {
          if(res.data){
            this.setState({
              name: res.data.name,
              })
          }else {
            alert('Error in network connection, try again');
          }
        })

    }

    handleDelete = (id) => {
      let userid = localStorage.getItem('admin');
      
      this.setState({
        deleting: true
      })

     axios.get(`${API_URL}/category/delete/${id}/${userid}`)
        .then(res => {
          if(res.data){
            this.getAllCategories();
          }
        });
    }

    handleEdit = (e) => {
      e.preventDefault();
      this.setState({
        disabled: true
      })

      let { name, categoryId } = this.state;

      let updatedCategory = new FormData();
      updatedCategory.append('name', name);
     

      try {
        // statements
        axios({
            method: 'post',
            url: `${API_URL}/${categoryId}`,
            data: updatedCategory,
           
        })
        .then(res => {
          if(res.data) {
            this.setState({
              disabled: false,
              transition: true,
            }, () => this.getAllCategories())
          }else {
            alert('Error in network connection, try again');
          }
        })
        .then(err => {
            console.log(err);
            this.setState({
                disabled: false,
            })
        })
      } catch(e) {
        // statements
        console.log(e);
      }

    }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      })
    }

    handleClose = () => {
      setTimeout(() => this.setState({transition: false}), 5000)
    }

    render() {
      let { category, loading, deleting, disabled, name, loadEdit, transition } = this.state;
        return (
          <div>
            <MainNav />
            <div style={{marginTop: '90px', marginLeft: '170px'}}>

              <TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
                <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
                  <Header><Icon name="check circle outline" size="big" /></Header>
                  <p>Category was updated successfully.</p>
                </Segment>
              </TransitionablePortal>

             <CreateCategory/>

              <Grid >
                <Grid.Column width={9}>
                  <Card.Group style={{marginTop: '20px'}}>
                    <Dimmer active={false} inverted style={{zIndex: '0px'}}>
                      <Loader indeterminate>Preparing Files</Loader>
                    </Dimmer>
                    <Dimmer active={deleting} inverted style={{zIndex: '0px'}}>
                      <Loader indeterminate>Deleting Category</Loader>
                    </Dimmer>
                    {
                      category &&
                        category.map((file) => {
                          return (
                            <Card key={file._id}>
                              <Card.Content>
                                <Card.Header>{file.name}</Card.Header>
                              </Card.Content>
                              <Card.Content extra>
                                <div className='ui two buttons'>
                                  <Button basic color='green' onClick={() => this.handleShowEdit(file._id)}>
                                    Edit
                                  </Button>
                                  <Button basic color='red' onClick={() => this.handleDelete(file._id)}>
                                    Delete
                                  </Button>
                                </div>
                              </Card.Content>
                            </Card>
                          )
                        })

                    }
                  </Card.Group>
                </Grid.Column>
                <Grid.Column width={7}>

                  {
                    loadEdit &&
                      <Form onSubmit={this.handleEdit} style={{padding: '25px', margin: 'auto'}}>
                        
                          <Form.Field disabled={disabled}>
                            <label htmlFor="name">Category Name</label>
                            <Input id="name" placeholder='name' value={name} onChange={this.handleChange} />
                          </Form.Field>
                         
                          <Button type='submit' disabled={disabled}>Edit</Button>
                      </Form>
                  }
                </Grid.Column>
              </Grid>

            </div>
            <SideNav /> 
          </div> 
        );
    }
}

export default withRouter(ListCategories);
