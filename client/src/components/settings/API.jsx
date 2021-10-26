import React from 'react';
import $ from 'jquery';
import PairsForm from './PairsForm.jsx';
import { ButtonGroup, Button } from 'react-bootstrap';


class API extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "api_key": this.props.api_key,
      "ETH/BTC": false,
      "LINK/BTC": false,
      "MATIC/BTC": false,
      "SOL/BTC": false,
      "SUSHI/BTC": false,
      "UNI/BTC": false,
      edit: false
    }
  }

  submitPairs() {
    var params = {
      "api_key": this.state["api_key"],
      "ETH/BTC": this.state["ETH/BTC"],
      "LINK/BTC": this.state["LINK/BTC"],
      "MATIC/BTC": this.state["MATIC/BTC"],
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
        this.setState({
          "ETH/BTC": false,
          "LINK/BTC": false,
          "MATIC/BTC": false,
          "SOL/BTC": false,
          "SUSHI/BTC": false,
          "UNI/BTC": false
        })
        console.log('success');
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

  onEdit() {
    if (!this.state.edit) {
      this.setState({ edit: true })
    } else {
      this.setState({ edit: false })
    }
  }

  render() {
    return (
      <div>
        <h4>{this.props.api_key}</h4>
        {this.state.edit ? <PairsForm onChangeRadio={this.onChangeRadio.bind(this)} submitPairs={this.submitPairs.bind(this)} /> : null}
        <Button onClick={this.onEdit.bind(this)}>Edit Pairs</Button>
        <p>--------------------------</p>
      </div>
    )
  }
}

export default API;