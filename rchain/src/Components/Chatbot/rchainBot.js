import React, { Component, Fragment } from 'react'
import { Button, Image, Transition, Icon } from 'semantic-ui-react'

class RchainBot extends Component {
  state = { visible: false, btnVisible: true }

  toggleVisibility = () => this.setState({ visible: false, btnVisible: true })

  handleVisibility = () => this.setState({visible: true, btnVisible: false})

  render() {
    const { visible, btnVisible } = this.state

    return (
      <div>
        <Transition visible={visible} animation='scale' duration={500}>
            <div style={{position: 'fixed', right: '20px', bottom: '20px'}}>
                <iframe width="350" height="430" 
                allow="microphone;" 
                src="https://console.dialogflow.com/api-client/demo/embedded/rchain">
                </iframe>
                <Icon style={{cursor: 'pointer', position: 'fixed', right: '45px', bottom: '400px', color: '#cc1f47'}} size="big" name="close"  onClick={this.toggleVisibility} />
            </div>
        </Transition>
        <Transition visible={btnVisible}>
            <Icon size="big" bordered inverted color='red' name="chat" onClick={this.handleVisibility} style={{cursor: 'pointer', position: 'fixed', bottom: '40px', right: '30px', color: '#cb1f47'}} />
        </Transition>
      </div>
    )
  }
}

export default RchainBot