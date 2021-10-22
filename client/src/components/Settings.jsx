import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { ButtonGroup, Button } from 'react-bootstrap';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "api_key": "",
      "secret": "",
      "subAccountName": "",
      "isFTXUS": false,
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
      'success': function(api_key) {
        console.log('api_key: ', api_key);
        console.log('type: ', typeof api_key);

        this.setState({ "apiValue": api_key });
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  onChangeRadio({ target }) {
    console.log(target.value);
    if (!this.state.isFTXUS) {
      this.setState({ "isFTXUS": true })
    } else {
      this.setState({ "isFTXUS": false })
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
          'success': function(api_key) {
            console.log('api_key: ', api_key);
            console.log('type: ', typeof api_key);

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

          <label for="subAccountName"><b>Secret</b></label>
          <input type="text" placeholder="Enter Sub Account Name" name="subAccountName" value={this.state.subAccountName} onChange={this.onChange.bind(this)} required></input>

          <label for="isFTXUS"><b>FTX.US?</b></label>
          <input type="radio" name="isFTXUS" value={this.state.isFTXUS} onChange={this.onChangeRadio.bind(this)} required></input>

          <button type="submit" onClick={this.submitAPI.bind(this)}>Submit</button>
        </div>
        <div>
          <p>{this.state.apiValue ? 'API Key: ' + this.state.apiValue : ''}</p>
          <div>
            { this.state.apiValue ? <p>ETH/BTC Pair:</p> : null }
            {this.state.apiValue ?
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary">Left</Button>
                  <Button variant="secondary">Middle</Button>
                  <Button variant="secondary">Right</Button>
                </ButtonGroup>
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;