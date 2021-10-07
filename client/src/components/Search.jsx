import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    var term = this.state.term;
    $.ajax({
      'url': 'http://localhost:1128/',
      // 'url': '/repos',
      'type': 'POST',
      'context': this,
      'data': { 'user': this.state.term },
      'success': function(top25Repos) {
        console.log('retrieved: ', top25Repos);
        this.props.onSearch(this.state.term, top25Repos.top25Repos);
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    return (<div>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange.bind(this)}/>
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>)
  }
}

export default Search;