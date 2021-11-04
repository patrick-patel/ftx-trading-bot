import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      redirect: false
    }
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  register() {
    var params = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    $.ajax({
      // 'url': 'http://localhost:1128/login',
      'url': '/register',
      'type': 'POST',
      'context': this,
      'data': params,
      'success': function() {
        console.log('success');
        this.setState({ redirect: true });
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <Container>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)} required />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.register.bind(this)}>
              Register
            </Button>
          </Form>
        </Container>
        {/* <div>
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} required></input>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required></input>

          <label for="psw2"><b>Password</b></label>
          <input type="password" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)} required></input>

          <button type="submit" onClick={this.register.bind(this)}>Register</button>
        </div> */}
      </div>
    )
  }
}

export default Register;