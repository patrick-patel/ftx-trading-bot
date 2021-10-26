import React from 'react';
import PairsForm from './PairsForm.jsx';

const API = (props) => (
  <div>
    <h4>{props.api_key}</h4>
    <PairsForm />
    <p>--------------------------</p>
  </div>
)

export default API;