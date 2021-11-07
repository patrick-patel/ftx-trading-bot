import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Container, ButtonGroup, Button, Form } from 'react-bootstrap';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": "",
      redirectResetPassword: false,
    };
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  submitEmail() {
    var json = {"email": this.state.email};
    $.ajax({
      'url': '/forgotPassword',
      'type': 'POST',
      'context': this,
      'data': json,
      'success': function(data) {
        console.log(data);
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    const redirectResetPassword = this.state.redirectResetPassword;
    if (redirectResetPassword) {
      return <Redirect to="/password-reset" />
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
                You will receive an email with a password reset link and will have 1 before the link expires.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" onSubmit={this.submitEmail.bind(this)}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default ForgotPassword;