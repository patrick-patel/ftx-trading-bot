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

  test() {
    $.ajax({
      'url': 'http://localhost:1128/tradingview',
      // 'url': '/repos',
      'type': 'POST',
      'context': this,
      'data': {
        event: 'local top',
        open: 0.0004984,
        close: 0.0004987,
        high: 0.0006,
        low: 0.0003
      },
      'success': function() {
        console.log('success');
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.test.bind(this)}> Test Signal </button>
      </div>
    )
  }
}

export default Search;