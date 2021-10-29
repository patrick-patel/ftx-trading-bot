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
        {credential["ETH/BTC"] ? <p>Subscribed To: ETH/BTC {credential["ETH/BTC"]}</p> : null}
        {credential["ETH/USD"] ? <p>Subscribed To: ETH/USD {credential["ETH/USD"]}</p> : null}
      </div>
      <div>
        <p>LINK: {credential["LINK"]}</p>
        {credential["LINK/BTC"] ? <p>Subscribed To: LINK/BTC {credential["LINK/BTC"]}</p> : null}
        {credential["LINK/USD"] ? <p>Subscribed To: LINK/USD {credential["LINK/USD"]}</p> : null}
      </div>
      <div>
        <p>MATIC: {credential["MATIC"]}</p>
        {credential["MATIC/BTC"] ? <p>Subscribed To: MATIC/BTC {credential["MATIC/BTC"]}</p> : null}
        {credential["MATIC/USD"] ? <p>Subscribed To: MATIC/USD {credential["MATIC/USD"]}</p> : null}
      </div>
      <div>
        <p>SOL: {credential["SOL"]}</p>
        {credential["SOL/BTC"] ? <p>Subscribed To: SOL/BTC {credential["SOL/BTC"]}</p> : null}
        {credential["SOL/USD"] ? <p>Subscribed To: SOL/USD {credential["SOL/USD"]}</p> : null}
      </div>
      <div>
        <p>UNI: {credential["UNI"]}</p>
        {credential["UNI/BTC"] ? <p>Subscribed To: UNI/BTC {credential["UNI/BTC"]}</p> : null}
        {credential["UNI/USD"] ? <p>Subscribed To: UNI/USD {credential["UNI/USD"]}</p> : null}
      </div>
    </div>
  </div>
)

export default Dashboard;
