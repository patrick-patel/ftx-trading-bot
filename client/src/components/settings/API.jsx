import React from 'react';
import PairsForm from './PairsForm.jsx';

import { ButtonGroup, Button } from 'react-bootstrap';


class API extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
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
    <div>
      <h4>{this.props.api_key}</h4>
      {this.state.edit ? <PairsForm onChangeRadio={this.props.onChangeRadio} submitPairs={this.props.submitPairs} /> : null}
      <Button onClick={this.onEdit.bind(this)}>Edit Pairs</Button>
      <p>--------------------------</p>
    </div>
  }
}

export default API;