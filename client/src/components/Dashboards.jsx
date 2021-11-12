import React from 'react';
import Dashboard from './Dashboard.jsx'
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Dashboards = ({ credentials }) => (
  <Container style={{padding: '20px'}}>
    <h5 className="display-5">Dashboard</h5>
    {credentials.length > 0 ? credentials.map(credential => <Dashboard credential={credential}/>) : <p className="lead">No subaccounts linked, go to the <Link to="/settings">settings</Link> page to add them</p>}
  </Container>
)

export default Dashboards;