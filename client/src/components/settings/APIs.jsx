import React from 'react';
import API from './API.jsx'

const APIs = (props) => (
  <div>
    <h4>API Keys</h4>
    <ul>
      {props.subAccounts.map(subAccount => <API subAccount={subAccount} />)}
    </ul>
  </div>

)

export default APIs;