import React from 'react';

const Dashboard = ({ credential }) => (
  <div>
    <div style={{color: 'white', backgroundColor: 'black', padding: '20px'}}>
      <p>API Key: {credential.api_key}</p>
      <p>Account Value USD:  {credential.total}</p>
      <p>BTC: {credential.btc}</p>
      <p>ETH: {credential.eth}</p>
      <p>LINK: {credential.link}</p>
      <p>MATIC: {credential.matic}</p>
      <p>SOL: {credential.sol}</p>
      <p>SUSHI: {credential.sushi}</p>
      <p>UNI: {credential.uni}</p>
    </div>
  </div>
)

export default Dashboard;
