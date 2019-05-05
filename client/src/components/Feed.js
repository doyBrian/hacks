import React, { Component } from 'react'
import { Feed, Icon, Popup, Modal, Form, Input, Button, Confirm } from 'semantic-ui-react'
import Moment from 'react-moment';
import API from "../utils/API";
import MessageNegative  from "./ErrorMsg";

class FeedComponent extends Component {
  
  state = {
    email: '',
    message: true,
    open: false
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  show = () => this.setState({ open: true })
  handleCancel = () => this.setState({ open: false })

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleDelete = (id, email) => {

    if (email === this.state.email) {
      API.deleteHack(id)
      .then(res => this.props.loadHacks())
      .catch(err => console.log(err));    
    } else
      this.setState({message: false})

    this.setState({email: ''})
  }

  handleFlag = (id) => {
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
              <Popup
              trigger={
              <Modal trigger={<a><Icon name='delete'onClick={this.handleOpen} /></a>}
              size='mini'
              dimmer='inverted'
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
              </Modal>}
              content="Delete post. Email associated with this post is required."
              basic
              />
              <Popup
              trigger={
              <a><Icon color = 'red' name='flag' onClick = {this.show}/></a>}
              content="Flag if deemed inappropriate or with suspicious link. Admin will review all flagged posts."
              basic
              />               
              <Confirm
              open={this.state.open}
              header='This post will be flagged as either inappropriate or suspicious. It will be subject to review.' 
              content='Are you sure you want to proceed with this action?'
              onCancel={this.handleCancel}
              onConfirm = { () => this.handleFlag(hack._id) }
              />
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

