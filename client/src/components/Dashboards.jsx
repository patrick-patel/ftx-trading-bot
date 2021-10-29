import React from 'react';
import Dashboard from './Dashboard.jsx'
import { Container } from 'react-bootstrap';


const Dashboards = ({ credentials }) => (
  <Container style={{padding: '20px'}}>
    <h2>Dashboard</h2>
    {credentials.length > 0 ? <ul>{credentials.map(credential => <Dashboard credential={credential} />)}</ul> : null}
  </Container>
)

export default Dashboards;