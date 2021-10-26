import React from 'react';
import PairsForm from './PairsForm.jsx';

import { ButtonGroup, Button } from 'react-bootstrap';


class API extends React.component {
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
      <h4>{props.api_key}</h4>
      {this.state.edit ? <PairsForm onChangeRadio={props.onChangeRadio} submitPairs={props.submitPairs} /> : null}
      <Button onClick={this.onEdit.bind(this)}>Edit Pairs</Button>
      <p>--------------------------</p>
    </div>
  }
}

export default API;