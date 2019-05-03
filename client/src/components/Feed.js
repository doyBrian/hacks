import React, { Component } from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import API from "../utils/API";
import Moment from 'react-moment';

class FeedComponent extends Component {
  
  state = {
    hacks: [],
    top5arr: [],
    recent: [],
    meta: 0
  };

  componentDidMount() {
  this.loadHacks();
  }

  loadHacks = () => {
    API.getHacks()
      .then(res => {
        console.log(res.data)
        this.setState({ hacks: res.data})
        this.state.hacks.sort(function (a, b) {
          if (a.meta < b.meta) {
            return 1;
        } else {
            return -1
        }})
        this.setState({ top5arr: this.state.hacks.slice(0,5)})
      }).catch(err => console.log(err));
  };

  handleClick = (id) => {
    let index = this.state.hacks.indexOf(id);
    console.log(index);
    /*this.setState({meta: this.state.hacks[index].meta + 1})
    API.updateHack(id, {
      meta: this.state.meta
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));*/
  }

  render() {
    return (
      <Feed>
        {this.state.top5arr.map(hack => (
          <Feed.Event>
            <Feed.Label image={hack.image} />
            <Feed.Content>
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
                  <Icon name='like' onClick = {this.handleClick(hack._id)} />
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