import React, { Component } from 'react'
import { Container, Grid, Image, Divider, Tab, Header, Icon, Segment } from 'semantic-ui-react'
import FeedComponent  from "./components/Feed";
import MiniFeed  from "./components/SingleFeed";
import FormComponent  from "./components/Form";
import SearchComponent from './components/Search';
import CardGroups from './components/Card';
import ModalOpening from './components/Modal';
import API from "./utils/API";
import "./style.css";


class App extends Component {

  state = {
    hacks: [],
    filteredhacks: [],
    flaggedhacks: [],
    top5arr: [],
    recent: [],
    panes: [],
    hackoftheday: [],
  };

  componentDidMount() {
    this.loadHacks()
    }

  loadHacks = () => {
      API.getHacks()
        .then(res => {
          console.log(res.data)
          this.setState({ hacks: res.data });
          this.setState({ filteredhacks: this.state.hacks.filter(hack => hack.flagged !== true) })
          this.setState({ hackoftheday: this.state.filteredhacks[Math.floor(Math.random() * this.state.filteredhacks.length)]})
          console.log(this.state.hackoftheday)
          this.setState({ recent: this.state.filteredhacks.slice(0,5)})
          this.setState({ flaggedhacks: this.state.hacks.filter(hack => hack.flagged === true) })
          this.state.filteredhacks.sort(function (a, b) {
            if (a.meta < b.meta) {
              return 1;
          } else {
              return -1
          }})
          this.setState({ top5arr: this.state.filteredhacks.slice(0,5)}) 
          this.setState({ panes : [
            { menuItem: 'New(s)', render: () => <Tab.Pane renderActiveOnly={false} attached={false}><Header as='h4' block><Header.Content>Just In!</Header.Content></Header><FeedComponent hacks={this.state.recent} handleClick={this.handleClick} loadHacks={this.loadHacks}/></Tab.Pane> },
            { menuItem: 'Lit As F-ive', render: () => <Tab.Pane renderActiveOnly={false} attached={false}><Header as='h4' block><Header.Content>Top 5 Most Likes</Header.Content></Header><FeedComponent hacks={this.state.top5arr} handleClick={this.handleClick} loadHacks={this.loadHacks}/></Tab.Pane> },
            { menuItem: 'searcHacks', render: () => <Tab.Pane renderActiveOnly={false} attached={false}><SearchComponent filteredhacks={this.state.filteredhacks} loadHacks={this.loadHacks} /></Tab.Pane> },
            { menuItem: 'WT-Hack', render: () => <Tab.Pane renderActiveOnly={false} attached={false}><Header as='h4' inverted color='red' block><Header.Content>Flagged for Review (Admin Access Only)</Header.Content></Header><CardGroups hacks={this.state.flaggedhacks} loadHacks={this.loadHacks} /></Tab.Pane> }    
          ]})
        }).catch(err => console.log(err));
    };

  handleClick = (id, meta) => {
    API.updateHack(id, {
      meta: meta + 1
    })
      .then(res => this.loadHacks()
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container>
      <ModalOpening />
      <h1>hacks</h1>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Grid.Row>
                <Image src='https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80' fluid />
              </Grid.Row>
              <Divider hidden />
              <Grid.Row>
                <Grid.Column>
                  <Header as='h2' content='Welcome Life Hackers!' />
                  Have a (ding!) lightbulb moment? <Icon color='yellow' size='large' name='lightbulb' />
                  <FormComponent loadHacks={this.loadHacks} />
                </Grid.Column>
                <Divider /> 
              </Grid.Row>
              <Grid.Row>
              <Segment secondary>
              <Header as='h4' color='teal' attached='top'><Header.Content>Hack Of The (H.O.T) Moment</Header.Content></Header>
              <MiniFeed hack={this.state.hackoftheday} loadHacks={this.loadHacks} filteredhacks={this.state.filteredhacks} />
              </Segment>
              </Grid.Row>
              </Grid.Column> 
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Tab menu={{ secondary: true, pointing: true }} panes={this.state.panes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
      );
  }
}

export default App;

