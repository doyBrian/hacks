import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Popup } from 'semantic-ui-react'
import API from "../utils/API";

const avatars = [
  'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
  'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
  'https://react.semantic-ui.com/images/avatar/small/stevie.jpg',
  'https://react.semantic-ui.com/images/avatar/small/veronika.jpg',
  'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
  'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
  'https://react.semantic-ui.com/images/avatar/small/ade.jpg',
  'https://react.semantic-ui.com/images/avatar/small/zoe.jpg',
  'https://react.semantic-ui.com/images/avatar/small/nan.jpg',
  'https://react.semantic-ui.com/images/avatar/small/rachel.png',
  'https://react.semantic-ui.com/images/avatar/small/lindsay.png',
  'https://react.semantic-ui.com/images/avatar/small/matthew.png',
  'https://react.semantic-ui.com/images/avatar/small/tom.jpg',
  'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
  'https://react.semantic-ui.com/images/avatar/small/helen.jpg',
  'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
  'https://react.semantic-ui.com/images/avatar/small/lena.png',
  'https://react.semantic-ui.com/images/avatar/small/mark.png',
  'https://react.semantic-ui.com/images/avatar/small/molly.png',
  'https://react.semantic-ui.com/images/avatar/small/justen.jpg',
  'https://react.semantic-ui.com/images/avatar/small/laura.jpg'
]

class FormComponent extends Component {

  state = {
    name: "",
    image: "",
    email: "",
    tag: "",
    link: "",
    summary: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.tag && this.state.summary) {
      API.saveHack({
        name: this.state.name,
        meta: Math.floor((Math.random() * 100) + 1),
        image: avatars[Math.floor(Math.random()*avatars.length)],
        email: this.state.email,
        tag: this.state.tag.toUpperCase(),
        link: this.state.link,
        summary: this.state.summary
      })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    //clear form
    this.setState({
      name: "",
      image: "",
      email: "",
      tag: "",
      link: "",
      summary: ""
    })
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
        <Popup
          trigger={<Form.Field
            name='name'
            control={Input}
            label='Name or Alias (required)'
            value = {this.state.name}
            onChange={this.handleInputChange}
          />}
          content="Use your real name or an alias and make it fun!"
          basic
        />
        <Popup
          trigger={<Form.Field
          name='email'
          control={Input}
          label='Email (required)'
          value = {this.state.email}
          onChange={this.handleInputChange}
        />}
        content="This will be used if you want to edit/delete your own post."
        basic
        />
        </Form.Group>
        <Popup
          trigger={<Form.Field
          name='tag'
          control={Input}
          label='Tag (required)'
          value = {this.state.tag}
          onChange={this.handleInputChange}
        />}
        content="A specific word(s) that best relates to the hack to make it searchable e.g. General (if not specific), Migraine, etc."
        basic
        />
        <Form.Field
          name='summary'
          control={TextArea}
          label='Summary (required)'
          placeholder='Be brief and concise with your hack description.'
          value = {this.state.summary}
          onChange={this.handleInputChange}
        />
        <Popup
          trigger={<Form.Field
          name='link'
          control={Input}
          label='Reference'
          value = {this.state.link}
          onChange={this.handleInputChange}
        />}
        content="Not required. Provide an external source link if available such us videos, website articles, etc."
        basic
        />

        <Form.Field
          name='submit'
          control={Button}
          content='Hack Away'
          label='Verify all your information before submitting!'
          disabled = {!(this.state.name && this.state.email && this.state.tag && this.state.summary)}
          onClick = {this.handleFormSubmit}
        />
      </Form>
    );
  }
}

export default FormComponent