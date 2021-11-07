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
      redirectHome: false,
      redirectForgotPassword: false,
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
            this.setState({ redirectHome: true });
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

  forgotPassword() {
    this.setState({ redirectForgotPassword: true });
  }

  render() {
    const redirectHome = this.state.redirectHome;
    const redirectForgotPassword = this.state.redirectForgotPassword;
    if (redirectHome) {
      return <Redirect to="/" />
    }
    if (redirectForgotPassword) {
      return <Redirect to="/forgot-password" />
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

            <Button variant="primary" type="submit" onSubmit={this.login.bind(this)}>
              Login
            </Button>
          </Form>
          <Button variant="primary" type="submit" onSubmit={this.forgotPassword.bind(this)}>
              Forgot Password
          </Button>
        </Container>
      </div>
    )
  }
}

export default Login;