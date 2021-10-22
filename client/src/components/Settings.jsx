import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "api_key": "",
      "secret": "",
      "apiValue": "",
      redirect: false
    };
  }

  componentDidMount() {
    $.ajax({
      'url': '/userAPI',
      'type': 'GET',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'success': function(data) {
        console.log(data);
        this.setState({ apiValue: data.api_key });
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  submitAPI() {
    var params = {
      api_key: this.state.api_key,
      secret: this.state.secret
    };
    $.ajax({
      'url': '/postAPI',
      'type': 'POST',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'data': params,
      'success': function(data) {
        console.log('success');
        $.ajax({
          'url': '/userAPI',
          'type': 'GET',
          'context': this,
          'headers': {
            'x-access-token': localStorage.getItem('token')
          },
          'success': function(api_key) {
            console.log('api_key: ', api_key, 'type: ', typeof api_key);
            this.setState({ "apiValue": api_key });
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
    return (
      <div>
        <div>
          <label for="api_key"><b>API Key</b></label>
          <input type="text" placeholder="Enter API Key" name="api_key" value={this.state.api_key} onChange={this.onChange.bind(this)} required></input>

          <label for="secret"><b>Secret</b></label>
          <input type="text" placeholder="Enter Secret" name="secret" value={this.state.secret} onChange={this.onChange.bind(this)} required></input>

          <button type="submit" onClick={this.submitAPI.bind(this)}>Submit</button>
        </div>
        <div>
          <p>{this.state.apiValue}</p>
          <p>{this.state.apiValue ? 'API Key: ' + this.state.apiValue : ''}</p>
        </div>
      </div>
    )
  }
}

export default Settings;