import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Settings from './components/Settings.jsx';
import Dashboards from './components/Dashboard.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: []
    }
  }

  componentDidMount() {
    console.log('comp did mount')
    $.ajax({
      'url': '/userData',
      'type': 'GET',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'success': function(credentials) {
        this.setState({
          credentials: credentials
        })
      }
    })
  }

  logout() {
    localStorage.removeItem("token");
  }

  render () {
    return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/login" onClick={this.logout.bind(this)}>Logout</Link></li>
        </ul>

        <Switch>
          <Route path="/" exact={true} component={() => <Dashboards credentials={this.state.credentials}/>}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/settings" component={Settings}/>
        </Switch>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));