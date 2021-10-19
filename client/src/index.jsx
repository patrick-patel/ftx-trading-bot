import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import RepoList from './components/RepoList.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class App extends React.Component {
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

  render () {
    return (
    <Router>
      <div>
        <div style={{color: 'white', backgroundColor: 'black', padding: '20px'}}>
          <h1>FTX Trading Bot</h1>
          <p>Account Value USD:  {this.state.total}</p>
          <p>MATIC:  {this.state.matic}</p>
          <p>LINK:  {this.state.link}</p>
          <p>BTC:  {this.state.btc}</p>
        </div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));