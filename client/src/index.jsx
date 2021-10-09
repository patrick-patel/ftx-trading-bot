import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountValue: 0,
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
          accountValue: res.accountValue,
          link: res.link,
          btc: res.btc
        })
      }
    })
  }

  // search (term, top25Repos) {
  //   console.log(`${term} was searched`);
  //   this.setState({
  //     repos: top25Repos
  //   })
  //   console.log(this.state.repos);
  // }

  render () {
    return (<div>
      <h1>FTX Trading Bot</h1>
      <p>Account Value USD:  {this.state.accountValue}</p>
      <p>Link:  {this.state.link}</p>
      <p>BTC:  {this.state.btc}</p>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));