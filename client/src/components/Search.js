import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

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
        </Grid.Column>
    )
  }
}