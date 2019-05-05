import React, { Component } from 'react'
import { Feed, Icon, Header, Popup, Modal, Form, Input, Message, Button } from 'semantic-ui-react'
import Moment from 'react-moment';
import API from "../utils/API";
import MessageNegative  from "./ErrorMsg";

class FeedComponent extends Component {
  
  state = {
    email: '',
    message: true
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

    if (email === this.state.email) {
      API.deleteHack(id)
      .then(res => this.props.loadHacks())
      .catch(err => console.log(err));    
    } else
      this.setState({message: false})

    this.setState({email: ''})
  }

  render() {
    return (
      <Feed>
        <Header as='h2' block>
        <Header.Content>{this.props.title}</Header.Content>
        </Header>
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
              <Modal.Header>Delete Your Post</Modal.Header>
                <Modal.Content>
                  <p>Enter the email associated with this post:</p>
                  <Form>
                    <Form.Input label='Email' placeholder='joe@schmoe.com'
                      name='email'
                      control={Input}
                      label='Email'
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
              <a><Icon color = 'red' name='flag' onClick = {() => this.props.handleFlag(hack._id)}/></a>}
              content="Flag if deemed inappropriate or with suspicious link. Admin will review all flagged posts."
              basic
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