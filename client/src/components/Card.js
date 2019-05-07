import React, { Component } from 'react'
import { Button, Card, Image, Modal, Form, Input, Divider } from 'semantic-ui-react'
import API from "../utils/API";
import MessageNegative  from "./ErrorMsg";

class CardGroups extends Component {

state = {
    password: '',
    message: true,
    modalOpen: false 
}

handleOpen = () => this.setState({ modalOpen: true })
handleClose = () => this.setState({ modalOpen: false })

handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

handleDelete = (id, password) => {
    if (password === this.state.password) {
      this.setState({ modalOpen: false })
        API.deleteHack(id)
        .then(res => this.props.loadHacks() )
        .catch(err => console.log(err));    
    } else
        this.setState({message: false})

    this.setState({password: ''})
}

handleApprove = (id, password) => {
    if (password === this.state.password) {
        this.setState({ modalOpen: false })
        console.log(this.state.modalOpen)
        API.updateHack(id, {
        flagged: false
        })
        .then(res => this.props.loadHacks() )
        .catch(err => console.log(err));
    } else
        this.setState({message: false})

        this.setState({password: ''})
  }

render() {
 return  (
  <Card.Group>
    {this.props.hacks.map(hack => (
    <Card centered>
      <Card.Content>
        <Image floated='right' size='mini' src={hack.image} />
        <Card.Header>{hack.name}</Card.Header>
        <Card.Description>
          {hack.summary}
          <Divider />
          <a href={hack.link}>{hack.link}</a>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        <Modal trigger={<Button basic color='red' onClick={this.handleOpen}>Delete</Button>}
              size='mini' 
              dimmer='inverted'
              open={this.modalOpen}
              onClose={this.handleClose}>
              <Modal.Header>Delete Post</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Input label='Enter Password' type='password'
                      name='password'
                      control={Input}
                      value = {this.state.password}
                      onChange={this.handleInputChange} />
                      <MessageNegative error={this.state.message} />
                    <Button onClick = {() => this.handleDelete(hack._id, 'admin')}>Submit</Button>
                  </Form>
                </Modal.Content>
              </Modal>
              <Modal trigger={<Button basic color='green' onClick={this.handleOpen}>Approve</Button>}
              size='mini' 
              dimmer='inverted'
              open={this.modalOpen}
              onClose={this.handleClose}>
              <Modal.Header>Approve Post</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Input label='Enter Password' type='password'
                      name='password'
                      control={Input}
                      value = {this.state.password}
                      onChange={this.handleInputChange} />
                      <MessageNegative error={this.state.message} />
                    <Button onClick = {() => this.handleApprove(hack._id, 'admin')}>Submit</Button>
                  </Form>
                </Modal.Content>
              </Modal>
        </div>
      </Card.Content>
    </Card>
    ))}
  </Card.Group>
    );
}
}
export default CardGroups