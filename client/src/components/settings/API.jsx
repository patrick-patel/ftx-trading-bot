import React from 'react';
import PairsForm from './PairsForm.jsx';

const API = ({api_key}) => (
  <div>
    <h4>{api_key}</h4>
    <PairsForm onChangeRadio={props.onChangeRadio} submitPairs={props.submitPairs} />
    <p>--------------------------</p>
  </div>
)

export default API;