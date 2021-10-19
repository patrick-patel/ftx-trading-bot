import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  login() {
    $.ajax({
      // 'url': 'http://localhost:1128/login',
      'url': '/login',
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
          <input type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange} required>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" value={this.state.password} onChange={this.onChange} required>

          <button type="submit" onSubmit={this.login.bind(this)} >Login</button>
        </div>
      </div>
    )
  }
}

export default Login;