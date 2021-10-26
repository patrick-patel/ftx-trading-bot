import React from 'react';
import API from './API.jsx'

const APIs = (props) => (
  <div>
    <h4>API Keys</h4>
    <ul>
      {props.state.["api_keys"].map(api_key => {
        <API
          api_key={api_key}
          ethbtc={props["ETH/BTC"]}
          linkbtc={props["LINK/BTC"]}
          maticbtc={props["MATIC/BTC"]}
          solbtc={props["SOL/BTC"]}
          sushibtc={props["SUSHI/BTC"]}
          unibtc={props["UNI/BTC"]}
        />
      })}
    </ul>
  </div>

)

export default APIs;