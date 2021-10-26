import React from 'react';
import PairsForm from './PairsForm.jsx';

const API = (props) => (
  <div>
    <h4>{props.api_key}</h4>
    <PairsForm
      ethbtc={props.ethbtc}
      linkbtc={props.linkbtc}
      maticbtc={props.maticbtc}
      solbtc={props.solbtc}
      sushibtc={props.sushibtc}
      unibtc={props.unibtc}
    />
    <p>--------------------------</p>
  </div>
)

export default API;