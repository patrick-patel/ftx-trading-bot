import React from 'react';
import $ from 'jquery';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      matic: 0,
      link: 0,
      btc: 0
    }
  }

  componentDidMount() {
    console.log('comp did mount')
    $.ajax({
      // 'url': 'http://localhost:1128/accountValue',
      'url': '/accountValue',
      'type': 'GET',
      'context': this,
      'success': function(res) {
        this.setState({
          total: res.total,
          matic: res['MATIC'],
          link: res['LINK'],
          btc: res['BTC']
        })
      }
    })
  }

  render() {
    return (
      <div>
        <div style={{color: 'white', backgroundColor: 'black', padding: '20px'}}>
          <h1>FTX Trading Bot</h1>
          <p>Account Value USD:  {this.state.total}</p>
          <p>MATIC:  {this.state.matic}</p>
          <p>LINK:  {this.state.link}</p>
          <p>BTC:  {this.state.btc}</p>
        </div>
      </div>
    )
  }
}

export default Dashboard;