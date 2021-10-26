import React from 'react';
import PairsForm from './PairsForm.jsx';

const API = (props) => (
  <div>
    <h4>{props.api_key}</h4>
    <PairsForm onChangeRadio={props.onChangeRadio} submitPairs={props.submitPairs}/>
    <p>--------------------------</p>
  </div>
)

export default API;