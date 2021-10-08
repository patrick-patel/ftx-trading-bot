import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountValue: 0
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
          accountValue: res.accountValue
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
      <p>{this.state.accountValue}</p>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));