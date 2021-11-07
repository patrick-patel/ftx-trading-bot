import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import APIs from './settings/APIs.jsx';

import { Container, ButtonGroup, Button, Form } from 'react-bootstrap';

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
          <br></br>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>API Key</Form.Label>
              <Form.Control type="text" placeholder="Enter API Key" name="api_key" value={this.state.api_key} onChange={this.onChange.bind(this)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Enter Secret" name="secret" value={this.state.secret} onChange={this.onChange.bind(this)} required />
              <Form.Text className="text-muted">
                API Secrets are encrypted before storage
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sub Account Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Sub Account Name" name="subAccountName" value={this.state.subAccountName} onChange={this.onChange.bind(this)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="radio" name="isFTXUS" value={this.state.isFTXUS} onChange={this.onChangeRadio.bind(this)} label="FTX US" />
            </Form.Group>
            <Button type="submit" style={cursor: "pointer"} onClick={this.submitAPI.bind(this)}>
              Submit
            </Button>
          </Form>
          <hr></hr>
          <div>
            {this.state.subAccounts.length > 0 ? <APIs subAccounts={this.state["subAccounts"]} /> : null}
          </div>
        </Container>
      </div>
    )
  }
}

export default Settings;