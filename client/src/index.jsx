import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Settings from './components/Settings.jsx';
import Dashboards from './components/Dashboards.jsx';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

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
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">FTX Trading Bot</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link><Link to="/">Dashboard</Link></Nav.Link>
                {this.state.isLoggedIn ? null : <Nav.Link><Link to="/login">Login</Link></Nav.Link>}
                {this.state.isLoggedIn ? null : <Nav.Link><Link to="/register">Register</Link></Nav.Link>}
                {this.state.isLoggedIn ? <Nav.Link><Link to="/settings">Settings</Link></Nav.Link> : null}
                {this.state.isLoggedIn ? <Nav.Link><Link to="/login" onClick={this.logout.bind(this)}>Logout</Link></Nav.Link> : null}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

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