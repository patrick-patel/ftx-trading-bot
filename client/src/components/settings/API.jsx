import React from 'react';
import PairsForm from './PairsForm.jsx';

const API = ({api_key}) => (
  <div>
    <h4>{api_key}</h4>
    <PairsForm />
    <p>--------------------------</p>
  </div>
)

export default API;