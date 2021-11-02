import React from 'react';
import API from './API.jsx'

const APIs = (props) => (
  <div>
    <h5 className="display-5">API Keys</h5>
    {props.subAccounts.map(subAccount => <API subAccount={subAccount} />)}
  </div>

)

export default APIs;