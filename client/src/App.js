import React, { Component } from 'react'
import { Container, Grid, Image, Divider, Tab, Header, Icon } from 'semantic-ui-react'
import FeedComponent  from "./components/Feed";
import FormComponent  from "./components/Form";
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
    this.loadHacks();
    }

  loadHacks = () => {
      API.getHacks()
        .then(res => {
          console.log(res.data)
          this.setState({ hacks: res.data });
          this.setState({ filteredhacks: this.state.hacks.filter(hack => hack.flagged === true) })
          this.setState({ hackoftheday: [] })
          this.setState({ hackoftheday: [...this.state.hackoftheday, this.state.filteredhacks[Math.floor(Math.random() * this.state.filteredhacks.length)]] })
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
            { menuItem: 'h.o.t. moment', render: () => <Tab.Pane attached={false}><Header as='h4' block><Header.Content>Hack Of The Moment</Header.Content></Header><FeedComponent hacks={this.state.hackoftheday} handleFlag={this.handleFlag} handleClick={this.handleClick} loadHacks={this.loadHacks}/></Tab.Pane> },
            { menuItem: 'fresh hacks', render: () => <Tab.Pane attached={false}><Header as='h4' block><Header.Content>Recently Added</Header.Content></Header><FeedComponent hacks={this.state.recent} handleFlag={this.handleFlag} handleClick={this.handleClick} loadHacks={this.loadHacks}/></Tab.Pane> },
            { menuItem: 'hack five', render: () => <Tab.Pane attached={false}><Header as='h4' block><Header.Content>Top 5 Most Likes</Header.Content></Header><FeedComponent hacks={this.state.top5arr} handleFlag={this.handleFlag} handleClick={this.handleClick} loadHacks={this.loadHacks}/></Tab.Pane> },
           
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
      <h1>hacks</h1>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Grid.Row>
                <Image src='https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80' fluid />
              </Grid.Row>
              <Divider hidden />
              <Grid.Row>       
              <h2><Icon color='yellow' name='lightbulb' circular />Welcome Life Hackers! <FormComponent /></h2>
              <Divider hidden />
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