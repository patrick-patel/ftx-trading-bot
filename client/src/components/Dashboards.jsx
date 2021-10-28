import React from 'react';
import Dashboard from './Dashboard.jsx'

const Dashboards = (props) => (
  <div>
    <h1>FTX Trading Bot</h1>
    <ul>{props.credentials.map(credential => <Dashboard credential={credential} />)}</ul>
  </div>
)

export default Dashboards;