import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Settings from './components/Settings.jsx';
import Dashboards from './components/Dashboards.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import PasswordReset from './components/PasswordReset.jsx';

import { Redirect } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: [],
      isLoggedIn: localStorage.getItem('token'),
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
        })
      }
    })
  }

  logout() {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: null
    })
  }


  render () {
    return (
    <Router>
      <div>
        <Navbar className="navbar navbar-dark bg-dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">FTX Trading Bot</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <br></br>
                {this.state.isLoggedIn ? <Nav.Link><Link to="/">Dashboard</Link></Nav.Link> : null}
                {this.state.isLoggedIn ? null : <Nav.Link><Link to="/login">Login</Link></Nav.Link>}
                {this.state.isLoggedIn ? null : <Nav.Link><Link to="/register">Register</Link></Nav.Link>}
                {this.state.isLoggedIn ? <Nav.Link><Link to="/settings">Settings</Link></Nav.Link> : null}
                {this.state.isLoggedIn ? <Nav.Link style={{cursor: "pointer"}}><Link to="/login" onClick={this.logout.bind(this)}>Logout</Link></Nav.Link> : null}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route path="/" exact={true}>
            {this.state.isLoggedIn ? <Dashboards credentials={this.state.credentials} data={this.state.data} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {this.state.isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {this.state.isLoggedIn ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/settings">
            {this.state.isLoggedIn ? <Settings /> : <Redirect to="/login" />}
          </Route>
          <Route path="/forgot-password">
            {!this.state.isLoggedIn ? <ForgotPassword /> : <Redirect to="/" />}
          </Route>
          <Route path="/password-reset">
            {!this.state.isLoggedIn ? <PasswordReset /> : <Redirect to="/" />}

          </Route>
        </Switch>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));