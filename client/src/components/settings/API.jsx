import React from 'react';
import $ from 'jquery';
import PairsForm from './PairsForm.jsx';
import { Redirect } from 'react-router';
import { ButtonGroup, Button } from 'react-bootstrap';


class API extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "api_key": this.props.subAccount[0],
      "subAccountName": this.props.subAccount[1],
      "ETH/BTC": "off",
      "LINK/BTC": "off",
      "MATIC/BTC": "off",
      "SOL/BTC": "off",
      "UNI/BTC": "off",
      "ETH/USD": "off",
      "LINK/USD": "off",
      "MATIC/USD": "off",
      "SOL/USD": "off",
      "UNI/USD": "off",
      edit: false,
      removeAPI: false,
      deletedAPI: false,
    }
  }

  submitPairs() {
    var params = {
      "api_key": this.state["api_key"],
      "ETH/BTC": this.state["ETH/BTC"],
      "LINK/BTC": this.state["LINK/BTC"],
      "MATIC/BTC": this.state["MATIC/BTC"],
      "SOL/BTC": this.state["SOL/BTC"],
      "UNI/BTC": this.state["UNI/BTC"],
      "ETH/USD": this.state["ETH/USD"],
      "LINK/USD": this.state["LINK/USD"],
      "MATIC/USD": this.state["MATIC/USD"],
      "SOL/USD": this.state["SOL/USD"],
      "UNI/USD": this.state["UNI/USD"]
    };
    console.log(params);
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

  deleteAPI() {
    var params = {
      "api_key": this.state["api_key"],
    };

    $.ajax({
      'url': '/deleteAPI',
      'type': 'POST',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'data': params,
      'success': function(data) {
        this.setState({
          deletedAPI: true
        })
        console.log('success');
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  onPairChange(pair, hr) {
    var pairSplit = pair.split('/');
    var coin = pairSplit[0];
    var base = pairSplit[1];
    if (base === "USD") {
      var otherPair = coin + "/BTC";
    } else {
      var otherPair = coin + "/USD";
    }
    this.setState({
      [pair]: hr,
      [otherPair]: "off"
    })
  }

  onChangeRadio({ target }) {
    if (!this.state[target.name]) {
      this.setState({ [target.name]: true })
    } else {
      this.setState({ [target.name]: false })
    }
  }

  onEdit() {
    if (!this.state.edit) {
      this.setState({ edit: true })
    } else {
      this.setState({ edit: false })
    }
  }

  onRemove() {
    if (!this.state.removeAPI) {
      this.setState({ removeAPI: true })
    } else {
      this.setState({ removeAPI: false })
    }
  }

  render() {
    return (
      <div>
        {!this.state.deletedAPI &&
          <h6 className="display-6">{this.state["subAccountName"]}</h6>
          <p className="lead">{this.state["api_key"]}</p>
          <>
            {this.state.edit ? <PairsForm state={this.state} onPairChange={this.onPairChange.bind(this)} submitPairs={this.submitPairs.bind(this)} /> : null}
            {this.state.edit ? <Button className="btn-secondary me-2" style={{cursor: "pointer"}} onClick={this.onEdit.bind(this)}>Cancel Edit</Button> : <Button className="me-2" style={{cursor: "pointer"}} onClick={this.onEdit.bind(this)}>Edit Pairs</Button>}
            {this.state.removeAPI ? <Button className="btn-secondary me-2" style={{cursor: "pointer"}} onClick={this.onRemove.bind(this)}>Cancel</Button> : <Button className="btn-danger" style={{cursor: "pointer"}} onClick={this.onRemove.bind(this)}>Remove API</Button>}
            {this.state.removeAPI ? <Button className="btn-warning" style={{cursor: "pointer"}} onClick={this.deleteAPI.bind(this)}>Confirm Removal of API</Button> : null}
            {this.state.removeAPI ? <p>You must <a href="#">delete the API Key from your FTX Account</a> to fully disable the bot</p> : null}
          </>
          <hr></hr>
        }
      </div>
    )
  }
}

export default API;