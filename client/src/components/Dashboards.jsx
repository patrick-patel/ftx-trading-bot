import React from 'react';
import Dashboard from './Dashboard.jsx'

const Dashboards = ({ credentials }) => (
  <div>
    <h2>Dashboard</h2>
    {credentials.length > 0 ? <ul>{credentials.map(credential => <Dashboard credential={credential} />)}</ul> : null}
  </div>
)

export default Dashboards;