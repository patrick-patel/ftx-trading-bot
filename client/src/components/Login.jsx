import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Container, ButtonGroup, Button, Form } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": "",
      "password": "",
      redirect: false
    };
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  login() {
    var json = {"email": this.state.email, "password": this.state.password};
    $.ajax({
      'url': '/login',
      'type': 'POST',
      'context': this,
      'data': json,
      'success': function(data) {
        console.log(data);
        localStorage.setItem("token", data.token);
        $.ajax({
          'url': '/userData',
          'type': 'GET',
          'context': this,
          'headers': {
            'x-access-token': localStorage.getItem('token')
          },
          'success': function(data) {
            console.log(data);
            this.setState({ redirect: true });
          },
          'error': function(error) {
            console.log(error);
          }
        })
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <br></br>
        <Container>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={this.login.bind(this)}>
              Login
            </Button>
          </Form>
        </Container>
        {/* <div>
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} required></input>

          <label for="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required></input>

          <button type="submit" onClick={this.login.bind(this)}>Login</button>
        </div> */}
      </div>
    )
  }
}

export default Login;