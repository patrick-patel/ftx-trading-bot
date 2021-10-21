import React from 'react';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": "",
      "password": ""
    }
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  login() {
    $.ajax({
      'url': '/login',
      'type': 'POST',
      // 'headers': {
      //   'Content-type': 'application/json'
      // },
      'context': this,
      'data': this.state,
      'success': function(data) {
        console.log(data);
        localStorage.setItem("token", data.token)
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  // useEffect() {
  //   $.ajax({
  //     'url': '/userData',
  //     'type': 'GET',
  //     'headers': {
  //       'x-access-token': localStorage.getItem('token')
  //     },
  //     'success': function(data) {
  //       console.log(data);
  //       data.isLoggedIn ? history.push('/dashboard') : null;
  //     },
  //     'error': function(error) {
  //       console.log(error);
  //     }
  //   })
  // }

  render() {
    return (
      <div>
        <div>
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} required></input>

          <label for="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} required></input>

          <button type="submit" onClick={this.login.bind(this)} >Login</button>
        </div>
      </div>
    )
  }
}

export default Login;