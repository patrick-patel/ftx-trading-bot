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
        {credential.isSubscribedTo["ETH/BTC"] ? <p>Subscribed To: ETH/BTC {credential.isSubscribedTo["ETH/BTC"]}</p> : null}
        {credential.isSubscribedTo["ETH/USD"] ? <p>Subscribed To: ETH/USD {credential.isSubscribedTo["ETH/USD"]}</p> : null}
      </div>
      <div>
        <p>LINK: {credential["LINK"]}</p>
        {credential.isSubscribedTo["LINK/BTC"] ? <p>Subscribed To: LINK/BTC {credential.isSubscribedTo["LINK/BTC"]}</p> : null}
        {credential.isSubscribedTo["LINK/USD"] ? <p>Subscribed To: LINK/USD {credential.isSubscribedTo["LINK/USD"]}</p> : null}
      </div>
      <div>
        <p>MATIC: {credential["MATIC"]}</p>
        {credential.isSubscribedTo["MATIC/BTC"] ? <p>Subscribed To: MATIC/BTC {credential.isSubscribedTo["MATIC/BTC"]}</p> : null}
        {credential.isSubscribedTo["MATIC/USD"] ? <p>Subscribed To: MATIC/USD {credential.isSubscribedTo["MATIC/USD"]}</p> : null}
      </div>
      <div>
        <p>SOL: {credential["SOL"]}</p>
        {credential.isSubscribedTo["SOL/BTC"] ? <p>Subscribed To: SOL/BTC {credential.isSubscribedTo["SOL/BTC"]}</p> : null}
        {credential.isSubscribedTo["SOL/USD"] ? <p>Subscribed To: SOL/USD {credential.isSubscribedTo["SOL/USD"]}</p> : null}
      </div>
      <div>
        <p>UNI: {credential["UNI"]}</p>
        {credential.isSubscribedTo["UNI/BTC"] ? <p>Subscribed To: UNI/BTC {credential.isSubscribedTo["UNI/BTC"]}</p> : null}
        {credential.isSubscribedTo["UNI/USD"] ? <p>Subscribed To: UNI/USD {credential.isSubscribedTo["UNI/USD"]}</p> : null}
      </div>
    </div>
  </div>
)

export default Dashboard;
