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
    };
    this.submitAPI = this.submitAPI.bind(this);
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

  submitAPI(e) {
    e.preventDefault();
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
            this.setState({
              "subAccounts": subAccounts,
              "api_key": "",
              "secret": "",
              "subAccountName": "",
              "isFTXUS": false,
            });
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
        <Container>
          <br></br>
          <h5 className="display-5">API Keys</h5>
          <Form className="bg-dark p-4">
            <Form.Group className="mb-3">
              <Form.Label className="text-white">API Key</Form.Label>
              <Form.Control type="text" placeholder="Enter API Key" name="api_key" value={this.state.api_key} onChange={this.onChange.bind(this)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control type="text" placeholder="Enter Secret" name="secret" value={this.state.secret} onChange={this.onChange.bind(this)} required />
              <Form.Text className="text-muted text-white">
                API Secrets are encrypted before storage
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Sub Account Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Sub Account Name" name="subAccountName" value={this.state.subAccountName} onChange={this.onChange.bind(this)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check className="text-white" type="radio" name="isFTXUS" value={this.state.isFTXUS} checked={this.state.isFTXUS} onChange={this.onChangeRadio.bind(this)} label="FTX US" />
            </Form.Group>
            <Button type="submit" style={{cursor: "pointer"}} onClick={(e) => this.submitAPI(e)}>
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