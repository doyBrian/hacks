import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import API from "../utils/API";


export default class SearchComponent extends Component {

  state = {
    hacks: [],
  };

  componentDidMount() {
    this.resetComponent()
    this.loadHacks()
  }

  loadHacks = () => {
    API.getHacks()
      .then(res => {
        console.log(res.data)
        this.setState({ hacks: res.data})
      }).catch(err => console.log(err));
  };

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.tag)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.hacks, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results} = this.state

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}