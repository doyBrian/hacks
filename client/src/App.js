import React, { Component } from 'react'
import { Container, Grid, Image, Divider, Header, Icon, Modal, Button, ModalDescription } from 'semantic-ui-react'
import FeedComponent  from "./components/Feed";
import FormComponent  from "./components/Form";
import SearchComponent from "./components/Search";

class App extends Component {

  state = {
    hacks: [],
    recent: [],
    top: [],
    name: "",
    location: "",
    image: "",
    email: "",
    tag: "",
    link: "",
    summary: "",
    modalOpen: false 
  };

  handleOpen = () => this.setState({ modalOpen: true })
  
  handleClose = () => {
    this.setState({ modalOpen: false })
    window.location.reload()
  }

  render() {
    return (
      <Container>
      <Header as='h1'>hacks</Header>
      <Divider />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column mobile={16} tablet={16} computer={8}>
                <Grid.Row>
              <Image src='https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80' fluid />
              </Grid.Row>
              <Divider />
              <Grid.Row>
              <Modal trigger={<Button onClick={this.handleOpen}>Got a hack?</Button>}open={this.state.modalOpen}
                  onClose={this.handleClose}>
                <Modal.Header>Lit A F-orm</Modal.Header>
                <Modal.Content image scrolling>
                  <Image size='medium' src='https://images.unsplash.com/photo-1548680101-69b3fe737048?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80' wrapped />
                  <Modal.Description>
                  </Modal.Description>
                  <FormComponent />
                </Modal.Content>
                <Modal.Actions>
                  <Button primary onClick={this.handleClose}>
                    Back <Icon name='chevron right' />
                  </Button>
                </Modal.Actions>
              </Modal>
              </Grid.Row>
              <Grid.Row>
              <SearchComponent/>
              </Grid.Row>
          </Grid.Column>  
            <Grid.Column mobile={16} tablet={16} computer={8}>
            <Header as='h2' block>
          <Icon name='lightbulb' color='yellow' />
          <Header.Content>Top 5 hacks</Header.Content>
        </Header>
              <FeedComponent />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
      );
  }
}

export default App;