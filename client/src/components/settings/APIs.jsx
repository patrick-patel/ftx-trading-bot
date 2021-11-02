import React from 'react';
import API from './API.jsx'

const APIs = (props) => (
  <div>
    <h4>API Keys</h4>
    {props.subAccounts.map(subAccount => <API subAccount={subAccount} />)}
  </div>

)

export default APIs;