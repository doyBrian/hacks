import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Feed, Icon, Modal, Form, Input, Button } from 'semantic-ui-react'
import API from "../utils/API"
import MessageNegative  from "./ErrorMsg";
import Moment from 'react-moment';

export default class SearchComponent extends Component {

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.tag })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.tag)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.filteredhacks, isMatch),
      })
    }, 300)
    console.log(this.state.results)
  }

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

  handleDelete = (id, email, index) => {
    if (email === this.state.email) {
      const tempArr = this.state.results.slice()
      this.setState({results: tempArr.splice(index, 1)})

      API.deleteHack(id)
      .then(res => this.props.loadHacks())
      .catch(err => console.log(err));    
    } else
      this.setState({message: false})

    this.setState({email: ''})
  }

  handleFlag = (id, index) => {
    console.log(id)
    console.log(index)
    const tempArr = this.state.results.slice()
    console.log(tempArr.splice(index, 1))
    this.setState({results: tempArr.splice(index, 1)})

    API.updateHack(id, {
      flagged: true
    })
      .then(res => this.props.loadHacks() )
      .catch(err => console.log(err));
  }

  handleClick = (id, meta, index) => {
    const tempArr = this.state.results.slice()
    tempArr[index].meta++
    this.setState({results: tempArr})

    API.updateHack(id, {
      meta: meta + 1
    })
      .then(res => this.props.loadHacks()
      )
      .catch(err => console.log(err));
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
        <Grid.Column floated='left' mobile={8} tablet={8} computer={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
          <Feed>
        {this.state.results.map(hack => (
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
                    <Button onClick = {() => this.handleDelete(hack._id, hack.email, this.state.results.indexOf(hack))}>Submit</Button>
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
                  <Button onClick = {() => this.handleFlag(hack._id, this.state.results.indexOf(hack))}>Proceed</Button>
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
                  <Icon color='red' name='like'  onClick = {() => this.handleClick(hack._id, hack.meta, this.state.results.indexOf(hack))} />
                  {hack.meta} Likes
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        ))}
      </Feed> 
        </Grid.Column>
    )
  }
}