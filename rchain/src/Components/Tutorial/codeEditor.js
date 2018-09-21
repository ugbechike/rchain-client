import React, { Component } from 'react'
import {  Grid, Button, Form, TextArea, TableHeader } from 'semantic-ui-react'
import '../style.css';

class CodeEditor extends Component{
    state={
        loading: false,
        codeValue: '',
        output: ''
    }

  

    handleRun =()=>{
        let { codeValue, output } = this.state;
        this.setState({
            loading: true
        })

        let evalVal = eval(codeValue)
        this.setState({
            output: evalVal,
            loading: false
        }, () => console.log(evalVal))

    }

    handleChange = (e) => {
        this.setState({
            codeValue: e.target.value
        })
    }

    render(){
        let  { loading, codeValue, output } = this.state;

        return (
            <div>
                
                <Grid divided='vertically'>
                    <Grid.Row>

                        <iframe src="https://rchain.cloud/" style={{
                            width: '57.7%', 
                            height: '630px',
                            position: 'fixed',
                            top: '70px'
                            }}>
 
                        </iframe>
                        {/* <Grid.Column width={8} style={{padding: '0'}}>
                                <TextArea placeholder='Enter Code'
                                            spellCheck='false'
                                            wrap='logical'
                                            onChange={this.handleChange}
                                            value={codeValue}
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
                                
                            <TextArea disabled placeholder='Result'
                                            spellCheck='false'
                                            wrap='logical'
                                            value={output}
                                    style={{ 
                                        minHeight: '640px', 
                                        width: '100%', 
                                        backgroundColor: '#1a1a1a',
                                        color: '#909c90',
                                        fontSize: '17px',
                                        position: 'fixed',
                                        top: '70px',
                                        borderRadius: '0'
                                    }} 
                                />

                            </div>
                        </Grid.Column> */}
                    </Grid.Row>

                
                </Grid>

            </div>
        );
    }
}
 
export default CodeEditor
