import React from 'react';
import PairsForm from './PairsForm.jsx';

const API = (props) => (
  <h4>{props.api_key}</h4>
  <PairsForm onChangeRadio={props.onChangeRadio} submitPairs={props.submitPairs} />
  <p>--------------------------</p>
)

export default API;