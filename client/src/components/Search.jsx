import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onChange(e) {
    this.setState({

    });
  }

  startBot() {
    $.ajax({
      'url': 'http://localhost:1128/startBot',
      // 'url': '/repos',
      'type': 'GET',
      'context': this,
      'success': function(top25Repos) {
        console.log('Bot Started');
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.startBot.bind(this)}> Start Bot </button>
      </div>
    )
  }
}

export default Search;