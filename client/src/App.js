import React, { Component } from 'react'
import { Container, Grid, Image, Divider} from 'semantic-ui-react'
import FeedComponent  from "./components/Feed";
import FormComponent  from "./components/Form";
import API from "./utils/API";
import "./style.css";

class App extends Component {

  state = {
    hacks: [],
    top5arr: [],
    recent: [],
  };

  componentDidMount() {
    this.loadHacks();
    }

  loadHacks = () => {
      API.getHacks()
        .then(res => {
          console.log(res.data)
          const filteredhacks = this.props.hacks.filter(hack => hack.flagged !== true);
          this.setState({ hacks: filteredhacks });
          this.setState({ recent: this.state.hacks.slice(0,5)})
          this.state.hacks.sort(function (a, b) {
            if (a.meta < b.meta) {
              return 1;
          } else {
              return -1
          }})
          this.setState({ top5arr: this.state.hacks.slice(0,5)})
      
        }).catch(err => console.log(err));
    };

  handleClick = (id, meta) => {
    API.updateHack(id, {
      meta: meta + 1
    })
      .then(res => {
        this.loadHacks()
      })
      .catch(err => console.log(err));
  }

  handleFlag = (id) => {
    API.updateHack(id, {
      flagged: true
    })
      .then(res => {console.log(res.data)})
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
                  <FormComponent />
              <Divider hidden />
              </Grid.Row>
          </Grid.Column>  
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <FeedComponent title="Top 5 hacks" hacks={this.state.hacks} handleClick={this.handleClick} loadHacks={this.loadHacks}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
      );
  }
}

export default App;