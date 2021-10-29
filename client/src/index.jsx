import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Settings from './components/Settings.jsx';
import Dashboards from './components/Dashboards.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';


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
        console.log('server response: ', credentials);
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
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/login" onClick={this.logout.bind(this)}>Logout</Link></li>
        </ul>

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