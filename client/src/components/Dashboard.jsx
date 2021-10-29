import React from 'react';

const Dashboard = ({ credential }) => (
  <div>
    <div style={{color: 'white', backgroundColor: 'black', padding: '20px'}}>
      <p>API Key: {credential.api_key}</p>
      <p>Account Value USD:  {credential.total}</p>
      <p>BTC: {credential["BTC"]}</p>
      <p>ETH: {credential["ETH"]}</p>
      <p>LINK: {credential["LINK"]}</p>
      <p>MATIC: {credential["MATIC"]}</p>
      <p>SOL: {credential["SOL"]}</p>
      <p>UNI: {credential["UNI"]}</p>
    </div>
  </div>
)

export default Dashboard;
