import React from 'react';
import API from './API.jsx'

const APIs = (props) => (
  <div>
    {props.subAccounts.map(subAccount => <API subAccount={subAccount} />)}
  </div>

)

export default APIs;