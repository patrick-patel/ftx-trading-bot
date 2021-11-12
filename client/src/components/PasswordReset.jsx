import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Container, ButtonGroup, Button, Form } from 'react-bootstrap';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "userID": "",
      "token": "",
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
      userID: this.state.userID,
      token: this.state.token,
      password: this.state.password,
      password2: this.state.password2
    };
    $.ajax({
      'url': '/password-reset',
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
    const redirectHome = this.state.redirectHome;
    if (redirectHome) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <br></br>
        <Container>
          <Form>
          <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text"  placeholder="Enter User ID" name="userID" value={this.state.userID} onChange={this.onChange.bind(this)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password Reset Token</Form.Label>
              <Form.Control type="text"  placeholder="Enter Token" name="token" value={this.state.token} onChange={this.onChange.bind(this)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password"  placeholder="Enter New Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password"  placeholder="Confirm New Password" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)} required />
            </Form.Group>

            <Button variant="primary" type="submit" style={{cursor: "pointer"}} onClick={this.resetPassword.bind(this)}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default PasswordReset;