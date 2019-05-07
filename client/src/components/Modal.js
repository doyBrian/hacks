import React, { Component } from 'react'
import { Button, Modal, Image } from 'semantic-ui-react'

class ModalOpening extends Component {
  state = { open: true }

  close = () => this.setState({ open: false })

  render() {
    const { open} = this.state

    return (
      <div>
        <Modal size='tiny' open={open} onClose={this.close}>
          <Modal.Content>
          <h1>hacks</h1>
            <Image bordered src='https://images.unsplash.com/photo-1548680101-69b3fe737048?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80' fluid />
            <h2>There's <i>hack</i>-a-ton here!</h2>
            <p>Feel a sense of anonymity, positivity, community and productivity.</p>
            <p>No log in required (like a real hacker!). No trolls and strong opinions to ruin your day. Just a community of life hackers that thrives in making life easy for all - one hack at a time.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content='Proceed' onClick={this.close}/>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalOpening