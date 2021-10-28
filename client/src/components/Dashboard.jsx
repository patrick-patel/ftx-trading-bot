import React from 'react';

const Dashboard = ({ credential }) => (
  <div>
    <div style={{color: 'white', backgroundColor: 'black', padding: '20px'}}>
    {credential.api_key ? <p>API Key: {credential.api_key}</p> : null}
      {credential.api_key ? <p>Account Value USD:  {credential.total}</p> : null}
      {credential.api_key ? <p>BTC: {credential.btc}</p> : null}
      {credential.api_key ? <p>ETH: {credential.eth}</p> : null}
      {credential.api_key ? <p>LINK: {credential.link}</p> : null}
      {credential.api_key ? <p>MATIC: {credential.matic}</p> : null}
      {credential.api_key ? <p>SOL: {credential.sol}</p> : null}
      {credential.api_key ? <p>SUSHI: {credential.sushi}</p> : null}
      {credential.api_key ? <p>UNI: {credential.uni}</p> : null}
    </div>
  </div>
)

export default Dashboard;
