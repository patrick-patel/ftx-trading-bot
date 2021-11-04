import React from 'react';
import Dashboard from './Dashboard.jsx'
import { Container } from 'react-bootstrap';


const Dashboards = ({ credentials, data }) => (
  <Container style={{padding: '20px'}}>
    <h5 className="display-5">Dashboard</h5>
    {credentials.length > 0 ? credentials.map(credential => <Dashboard credential={credential} data={data}/>) : null}
  </Container>
)

export default Dashboards;