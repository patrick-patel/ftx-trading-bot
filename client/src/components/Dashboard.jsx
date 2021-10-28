import React from 'react';

const Dashboard = ({ credential }) => (
  <div>
    {credential.api_key ?
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
    : null}
  </div>
)

export default Dashboard;
