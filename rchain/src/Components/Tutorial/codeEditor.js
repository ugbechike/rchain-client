import React, { Component } from 'react'
import {  Grid, Button, Form, TextArea, TableHeader } from 'semantic-ui-react'
import '../style.css';

class CodeEditor extends Component{
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
                    <Grid.Row>
                        <Grid.Column width={8} style={{padding: '0'}}>
                                <TextArea placeholder=''
                                            spellCheck='false'
                                            wrap='logical'
                                    style={{ 
                                        minHeight: '640px', 
                                        width: '31%', 
                                        caretColor: 'rgb(142, 153, 144)',
                                        backgroundColor: '#734444',
                                        color: '#909c90',
                                        fontSize: '17px',
                                        position: 'fixed',
                                        top: '70px',
                                        borderRadius: '0'
                                    }} 
                                />
                                
                                <Button primary loading={loading} content='Run Code' labelPosition='left' icon='code' onClick={this.handleRun} style={{marginTop: '15px', marginLeft: '18px', position: 'fixed', bottom: '6px'}} />
                                
                        </Grid.Column>
                        <Grid.Column width={8} style={{padding: '0'}}>
                            <div>
                                <iframe name='iframeResult'
                                    style={{
                                        width: '100%',
                                        minHeight: '640px',
                                        backgroundColor: 'gray',
                                        position: 'fixed',
                                        top: '70px'
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
 
export default CodeEditor
