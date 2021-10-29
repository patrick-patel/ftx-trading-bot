import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NavbarComp from './components/NavbarComp.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Settings from './components/Settings.jsx';
import Dashboards from './components/Dashboards.jsx';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: [],
      isLoggedIn: false,
      redirect: false
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
        console.log('server response: ', credentials);
        this.setState({
          credentials: credentials,
          isLoggedIn: true,
          redirect: true
        })
      }
    })
  }

  logout() {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false
    })
  }

  render () {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/' />
    }
    return (
    <Router>
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} logout={this.logout.bind(this)}/>

        <Switch>
          <Route path="/" exact={true} render={() => <Dashboards credentials={this.state.credentials} />}/>
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