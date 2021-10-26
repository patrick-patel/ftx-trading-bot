import React from 'react';
import PairsForm from './PairsForm.jsx';

const API = ({api_key, ethbtc, linkbtc, maticbtc, solbtc, sushibtc, unibtc}) => (
  <div>
    <h4>{api_key}</h4>
    <PairsForm
      ethbtc={ethbtc}
      linkbtc={linkbtc}
      maticbtc={maticbtc}
      solbtc={solbtc}
      sushibtc={sushibtc}
      unibtc={unibtc}
    />
    <p>--------------------------</p>
  </div>
)

export default API;