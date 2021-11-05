import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Container, ButtonGroup, Button, Form } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "password": "",
      "password2": "",
      redirectHome: false,
    };
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  resetPassword() {
    var params = {
      password: this.state.password,
      password2: this.state.password2
    };
    $.ajax({
      'url': '/login',
      'type': 'POST',
      'context': this,
      'data': params,
      'success': function(data) {
        console.log(data);
        this.setState({redirectHome: true})
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    const redirect = this.state.redirect;
    if (redirectHome) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <br></br>
        <Container>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password"  placeholder="Enter New Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password"  placeholder="Confirm New Password" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)} required />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={this.resetPassword.bind(this)}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default Login;