import React, { Component } from 'react'
import { Feed, Icon, Modal, Form, Input, Button } from 'semantic-ui-react'
import Moment from 'react-moment';
import API from "../utils/API";
import MessageNegative  from "./ErrorMsg";

class FeedComponent extends Component {
  
  state = {
    email: '',
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

  handleDelete = (id, email) => {
    console.log(id)
    if (email === this.state.email) {
      API.deleteHack(id)
      .then(res => this.props.loadHacks())
      .catch(err => console.log(err));    
    } else
      this.setState({message: false})

    this.setState({email: ''})
  }

  handleFlag = (id) => {
    console.log(id)
    this.setState({ open: false })
    API.updateHack(id, {
      flagged: true
    })
      .then(res => this.props.loadHacks() )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Feed>
        {this.props.hacks.map(hack => (
          <Feed.Event key={hack._id}>
            <Feed.Label image={hack.image} />
            <Feed.Content>
              <Modal 
              trigger={<a><Icon name='delete' onClick={this.handleOpen} /></a>}
              size='mini'
              open={this.modalOpen}
              onClose={this.handleClose}>
              <Modal.Header>Delete Post</Modal.Header>
                <Modal.Content>
                  <p>Enter the email associated with this post:</p>
                  <Form>
                    <Form.Input placeholder='joe@schmoe.com'
                      name='email'
                      control={Input}
                      value = {this.state.email}
                      onChange={this.handleInputChange} />
                      <MessageNegative error={this.state.message} />
                    <Button onClick = {() => this.handleDelete(hack._id, hack.email)}>Submit</Button>
                  </Form>
                </Modal.Content>
              </Modal>
              <Modal 
              trigger={ <a><Icon color = 'red' name='flag' onClick={this.handleOpen} /></a>}
              size='mini'
              open={this.modalOpen}
              onClose={this.handleClose}>
              <Modal.Header>Flag This Post</Modal.Header>
                <Modal.Content>
                  <p>This post will be flagged as either inappropriate or suspicious. It will be subject to review.</p>
                  <Button onClick = {() => this.handleFlag(hack._id)}>Proceed</Button>
                </Modal.Content>
              </Modal>         
              <Feed.Summary>
                {hack.name} posted:
                <Feed.Date><Moment fromNow>{hack.date}</Moment></Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>
                {hack.summary}
              </Feed.Extra>
              <a href={hack.link} target="blank">{hack.link}</a><br></br>
              <Feed.Meta>
                <Feed.Like>
                  <Icon color='red' name='like'  onClick = {() => this.props.handleClick(hack._id, hack.meta)} />
                  {hack.meta} Likes
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        ))}
      </Feed> 
    );
  }
}

export default FeedComponent;

