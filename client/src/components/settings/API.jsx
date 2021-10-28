import React from 'react';
import $ from 'jquery';
import PairsForm from './PairsForm.jsx';
import { ButtonGroup, Button } from 'react-bootstrap';


class API extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "api_key": this.props.api_key,
      "ETH/BTC": "off",
      "LINK/BTC": "off",
      "MATIC/BTC": "off",
      "SOL/BTC": "off",
      "SUSHI/BTC": "off",
      "UNI/BTC": "off",
      edit: false,
      redirect: false
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
    console.log(params);
    // $.ajax({
    //   'url': '/setPairs',
    //   'type': 'POST',
    //   'context': this,
    //   'headers': {
    //     'x-access-token': localStorage.getItem('token')
    //   },
    //   'data': params,
    //   'success': function(data) {
    //     this.setState({
    //       redirect: true
    //     })
    //     console.log('success');
    //   },
    //   'error': function(error) {
    //     console.log(error);
    //   }
    // })
  }

  onPairChange(pair, hr) {
    this.setState({
      [pair]: hr
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
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/settings' />
    }
    return (
      <div>
        <h4>{this.props.api_key}</h4>
        {this.state.edit ? <PairsForm state={this.state} onPairChange={this.onPairChange.bind(this)} submitPairs={this.submitPairs.bind(this)} /> : null}
        <Button onClick={this.onEdit.bind(this)}>Edit Pairs</Button>
        <p>--------------------------</p>
      </div>
    )
  }
}

export default API;