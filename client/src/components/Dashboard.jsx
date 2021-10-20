import React from 'react';
import $ from 'jquery';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      btc: 0,
      eth: 0,
      link: 0,
      matic: 0,
      sol: 0,
      sushi: 0,
      uni: 0,
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
          btc: res['BTC'] || 0,
          eth: res['ETH'] || 0,
          link: res['LINK'] || 0,
          matic: res['MATIC'] || 0,
          sol: res['SOL'] || 0,
          sushi: res['SUSHI'] || 0,
          uni: res['UNI'] || 0,
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
          <p>BTC: {this.state.btc}</p>
          <p>ETH: {this.state.eth}</p>
          <p>LINK: {this.state.link}</p>
          <p>MATIC: {this.state.matic}</p>
          <p>SOL: {this.state.sol}</p>
          <p>SUSHI: {this.state.sushi}</p>
          <p>UNI: {this.state.uni}</p>
        </div>
      </div>
    )
  }
}

export default Dashboard;