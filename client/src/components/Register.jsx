import React from 'react';
import $ from 'jquery';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
    }
  }

  onChange({ target }) {
    console.log( target );
    this.setState({ [target.name]: target.value });
  }

  login() {
    $.ajax({
      // 'url': 'http://localhost:1128/login',
      'url': '/register',
      'type': 'POST',
      'context': this,
      'data': this.state,
      'success': function() {
        console.log('success');
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <div>
        <div>
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} required></input>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required></input>

          <label for="psw2"><b>Password</b></label>
          <input type="password" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)} required></input>

          <button type="submit" onClick={this.login.bind(this)}>Register</button>
        </div>
      </div>
    )
  }
}

export default Register;