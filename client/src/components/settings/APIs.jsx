import React from 'react';
import API from './API.jsx'

const APIs = (props) => (
  <div>
    <h4>API Keys</h4>
    <ul>
      {Object.keys(props.api_keys).map(key => <API api_key={props.api_keys[key]} />)}
    </ul>
  </div>

)

export default APIs;