import React from 'react';
import API from './API.jsx'

const APIs = (props) => (
  <div>
    <h4>API Keys</h4>
    <ul>
      {props.state["api_keys"].map(api_key => {
        <API
          api_key={api_key}
          ethbtc={props.state["ETH/BTC"]}
          linkbtc={props.state["LINK/BTC"]}
          maticbtc={props.state["MATIC/BTC"]}
          solbtc={props.state["SOL/BTC"]}
          sushibtc={props.state["SUSHI/BTC"]}
          unibtc={props.state["UNI/BTC"]}
        />
      })}
    </ul>
  </div>

)

export default APIs;