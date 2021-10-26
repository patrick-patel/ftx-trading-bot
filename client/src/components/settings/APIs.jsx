import React from 'react';
import API from './API.jsx'

const APIs = (props) => (
  <div>
    <h4>API Keys</h4>
    <ul>
      {Object.keys(props.api_keys) ? Object.keys(props.api_keys).map(key => {
        <API
          api_key={props.api_keys[key]}
          ethbtc={props["ETH/BTC"]}
          linkbtc={props["LINK/BTC"]}
          maticbtc={props["MATIC/BTC"]}
          solbtc={props["SOL/BTC"]}
          sushibtc={props["SUSHI/BTC"]}
          unibtc={props["UNI/BTC"]}
        />
      })
      : null}
    </ul>
  </div>

)

export default APIs;