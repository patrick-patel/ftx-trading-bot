import React from 'react';
import API from './API.jsx'

const APIs = (props) => (
  <div>
    <h4>API Keys</h4>
    <ul>
      {props.api_keys.map(api_key => {
        <API api_key={api_key} />
      })}
    </ul>
  </div>

)

export default APIs;