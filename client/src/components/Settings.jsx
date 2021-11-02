import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import APIs from './settings/APIs.jsx';

import { Container, ButtonGroup, Button } from 'react-bootstrap';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "api_key": "",
      "secret": "",
      "subAccountName": "",
      "isFTXUS": false,
      "subAccounts": [],
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
      'success': function(subAccounts) {
        this.setState({ "subAccounts": subAccounts });
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  onChangeRadio({ target }) {
    if (!this.state[target.name]) {
      this.setState({ [target.name]: true })
    } else {
      this.setState({ [target.name]: false })
    }
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  submitAPI() {
    var params = {
      api_key: this.state.api_key,
      secret: this.state.secret,
      isFTXUS: this.state.isFTXUS,
      subAccountName: this.state.subAccountName
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
          'success': function(subAccounts) {
            this.setState({ "subAccounts": subAccounts, redirect: true });
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
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/settings' />
    }
    return (
      <div>
        <Container>
          <label for="api_key"><b>API Key</b></label>
          <input type="text" placeholder="Enter API Key" name="api_key" value={this.state.api_key} onChange={this.onChange.bind(this)} required></input>

          <label for="secret"><b>Secret</b></label>
          <input type="text" placeholder="Enter Secret" name="secret" value={this.state.secret} onChange={this.onChange.bind(this)} required></input>

          <label for="subAccountName"><b>Sub Account Name</b></label>
          <input type="text" placeholder="Enter Sub Account Name" name="subAccountName" value={this.state.subAccountName} onChange={this.onChange.bind(this)} required></input>

          <label for="isFTXUS"><b>FTX.US?</b></label>
          <input type="radio" name="isFTXUS" value={this.state.isFTXUS} onChange={this.onChangeRadio.bind(this)} required></input>

          <button type="submit" onClick={this.submitAPI.bind(this)}>Submit</button>
        </Container>
        {this.state.subAccounts.length > 0 ? <APIs subAccounts={this.state["subAccounts"]} /> : null}
      </div>
    )
  }
}

export default Settings;