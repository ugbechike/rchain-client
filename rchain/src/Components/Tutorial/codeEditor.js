import React, { Component } from 'react'
import {  Grid, Button, Form, TextArea, TableHeader } from 'semantic-ui-react'
import '../style.css';

class codeEditor extends Component{
    state={
        loading: false
    }

    handleRun =()=>{
        this.setState({
            loading: true
        })
    }

    render(){
        let  { loading } = this.state;

        return (
            <div>
                
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column style={{padding: '0'}}>
                        <Form>
                            <TextArea placeholder=''
                                        spellcheck='false'
                                        wrap='logical'
                                style={{ minHeight: 600, width: '100%', 
                                    caretColor: 'red',
                                    caretColor: '#ff0000',
                                    caretColor: 'rgb(255, 0, 0)',
                                    caretColor: 'hsl(0, 97%, 50%)',
                                    backgroundColor: 'black',
                                    color: '#909c90',
                                    fontSize: '20px',
                                }} 
                            />
                            
                            <Button loading={loading} content='Run Code' labelPosition='left' icon='code' onClick={this.handleRun} style={{marginTop: '15px', marginLeft: '18px'}} />
                            
                        </Form>
                        </Grid.Column>
                        <Grid.Column style={{padding: '0'}}>
                            <div>
                                <iframe name='iframeResult'
                                    style={{
                                        width: '100%',
                                        minHeight: '600px',
                                        backgroundColor: 'gray'
                                    }}
                                />
                            </div>
                        </Grid.Column>
                    </Grid.Row>

                
                </Grid>

            </div>
        );
    }
}
 
export default codeEditor
