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
      "ETH/BTC": false,
      "LINK/BTC": false,
      "MATIC/BTC": false,
      "SOL/BTC": false,
      "SUSHI/BTC": false,
      "UNI/BTC": false,
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
      this.setState({ [target.name]: true })
    } else {
      this.setState({ [target.name]: false })
    }
  }

  onChangePair({ target }) {
    this.setState({ [target.name]: target.value });
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

  submitPairs() {
    var params = {
      "ETH/BTC": this.state["ETH/BTC"],
      "LINK/BTC": this.state["LINK/BTC"],
      "MATIC/BTC": this.state["MATIC/BTC"]
      "SOL/BTC": this.state["SOL/BTC"],
      "SUSHI/BTC": this.state["SUSHI/BTC"],
      "UNI/BTC": this.state["UNI/BTC"]
    };
    $.ajax({
      'url': '/setPairs',
      'type': 'POST',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'data': params,
      'success': function(data) {
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
          <br></br>
          <p>{this.state.apiValue ? <label for="ETH/BTC"><b>ETH/BTC Pair</b></label> : null}</p>
          <div>
            {this.state.apiValue ? <input type="radio" name="ETH/BTC" value={this.state.["ETH/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
          </div>

          <p>{this.state.apiValue ? <label for="LINK/BTC"><b>LINK/BTC Pair</b></label> : null}</p>
          <div>
            {this.state.apiValue ? <input type="radio" name="LINK/BTC" value={this.state.["LINK/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
          </div>

          <p>{this.state.apiValue ? <label for="MATIC/BTC"><b>MATIC/BTC Pair</b></label> : null}</p>
          <div>
            {this.state.apiValue ? <input type="radio" name="MATIC/BTC" value={this.state.["MATIC/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
          </div>

          <p>{this.state.apiValue ? <label for="SOL/BTC"><b>SOL/BTC Pair</b></label> : null}</p>
          <div>
            {this.state.apiValue ? <input type="radio" name="SOL/BTC" value={this.state.["SOL/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
          </div>

          <p>{this.state.apiValue ? <label for="SUSHI/BTC"><b>SUSHI/BTC Pair</b></label> : null}</p>
          <div>
            {this.state.apiValue ? <input type="radio" name="SUSHI/BTC" value={this.state.["SUSHI/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
          </div>

          <p>{this.state.apiValue ? <label for="UNI/BTC"><b>UNI/BTC Pair</b></label> : null}</p>
          <div>
            {this.state.apiValue ? <input type="radio" name="UNI/BTC" value={this.state.["UNI/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
          </div>
          <button type="submit" onClick={this.submitPairs.bind(this)}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Settings;