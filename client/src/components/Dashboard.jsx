import React from 'react';

const Dashboard = ({ credential }) => (
  <div>
    <div style={{color: 'white', backgroundColor: 'black', padding: '20px'}}>
      <p>Sub Account Name: {credential.subAccountName}</p>
      <p>API Key: {credential.api_key}</p>
      <p>Account Value USD:  {credential.total}</p>
      <div>
        <p>BTC: {credential["BTC"]}</p>
      </div>
      <div>
        <p>ETH: {credential["ETH"]}</p>
        {credential.isSubscribedTo[0]["ETH/BTC"] ? <p>Subscribed To: ETH/BTC {credential.isSubscribedTo[0]["ETH/BTC"]}</p> : null}
        {credential.isSubscribedTo[0]["ETH/USD"] ? <p>Subscribed To: ETH/USD {credential.isSubscribedTo[0]["ETH/USD"]}</p> : null}
      </div>
      <div>
        <p>LINK: {credential["LINK"]}</p>
        {credential.isSubscribedTo[0]["LINK/BTC"] ? <p>Subscribed To: LINK/BTC {credential.isSubscribedTo[0]["LINK/BTC"]}</p> : null}
        {credential.isSubscribedTo[0]["LINK/USD"] ? <p>Subscribed To: LINK/USD {credential.isSubscribedTo[0]["LINK/USD"]}</p> : null}
      </div>
      <div>
        <p>MATIC: {credential["MATIC"]}</p>
        {credential.isSubscribedTo[0]["MATIC/BTC"] ? <p>Subscribed To: MATIC/BTC {credential.isSubscribedTo[0]["MATIC/BTC"]}</p> : null}
        {credential.isSubscribedTo[0]["MATIC/USD"] ? <p>Subscribed To: MATIC/USD {credential.isSubscribedTo[0]["MATIC/USD"]}</p> : null}
      </div>
      <div>
        <p>SOL: {credential["SOL"]}</p>
        {credential.isSubscribedTo[0]["SOL/BTC"] ? <p>Subscribed To: SOL/BTC {credential.isSubscribedTo[0]["SOL/BTC"]}</p> : null}
        {credential.isSubscribedTo[0]["SOL/USD"] ? <p>Subscribed To: SOL/USD {credential.isSubscribedTo[0]["SOL/USD"]}</p> : null}
      </div>
      <div>
        <p>UNI: {credential["UNI"]}</p>
        {credential.isSubscribedTo[0]["UNI/BTC"] ? <p>Subscribed To: UNI/BTC {credential.isSubscribedTo[0]["UNI/BTC"]}</p> : null}
        {credential.isSubscribedTo[0]["UNI/USD"] ? <p>Subscribed To: UNI/USD {credential.isSubscribedTo[0]["UNI/USD"]}</p> : null}
      </div>
    </div>
  </div>
)

export default Dashboard;
