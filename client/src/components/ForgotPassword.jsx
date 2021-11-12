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
    this.submitEmail = this.submitEmail.bind(this);
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  submitEmail(e) {
    e.preventDefault();
    var json = {"email": this.state.email};
    $.ajax({
      'url': '/forgotPassword',
      'type': 'POST',
      'context': this,
      'data': json,
      'success': function(data) {
        console.log('response success');
        this.setState({redirectResetPassword: true});
        console.log(data);
      },
      'error': function(error) {
        console.log('response error');
        console.log(error);
      }
    })
  }

  render() {
    const redirectResetPassword = this.state.redirectResetPassword;
    if (redirectResetPassword) {
      return <Redirect to="/passwordReset" />
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
                You will receive an email with a password reset link and will have 1 hr before the link expires.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" style={{cursor: "pointer"}} onClick={(e) => this.submitEmail(e)}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default ForgotPassword;