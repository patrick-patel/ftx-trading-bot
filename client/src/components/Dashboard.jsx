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
        {credential.isSubscribedTo["ETH/BTC"]["1hr"] ? <p>Subscribed To: ETH/BTC 1hr</p> : null}
        {credential.isSubscribedTo["ETH/BTC"]["2hr"] ? <p>Subscribed To: ETH/BTC 2hr</p> : null}
        {credential.isSubscribedTo["ETH/BTC"]["4hr"] ? <p>Subscribed To: ETH/BTC 4hr</p> : null}
        {credential.isSubscribedTo["ETH/BTC"]["6hr"] ? <p>Subscribed To: ETH/BTC 6hr</p> : null}
        {credential.isSubscribedTo["ETH/BTC"]["12hr"] ? <p>Subscribed To: ETH/BTC 12hr</p> : null}

        {credential.isSubscribedTo["ETH/USD"]["1hr"] ? <p>Subscribed To: ETH/USD 1hr</p> : null}
        {credential.isSubscribedTo["ETH/USD"]["2hr"] ? <p>Subscribed To: ETH/USD 2hr</p> : null}
        {credential.isSubscribedTo["ETH/USD"]["4hr"] ? <p>Subscribed To: ETH/USD 4hr</p> : null}
        {credential.isSubscribedTo["ETH/USD"]["6hr"] ? <p>Subscribed To: ETH/USD 6hr</p> : null}
        {credential.isSubscribedTo["ETH/USD"]["12hr"] ? <p>Subscribed To: ETH/USD 12hr</p> : null}
      </div>
      <div>
        <p>LINK: {credential["LINK"]}</p>
        {credential.isSubscribedTo["LINK/BTC"]["1hr"] ? <p>Subscribed To: LINK/BTC 1hr</p> : null}
        {credential.isSubscribedTo["LINK/BTC"]["2hr"] ? <p>Subscribed To: LINK/BTC 2hr</p> : null}
        {credential.isSubscribedTo["LINK/BTC"]["4hr"] ? <p>Subscribed To: LINK/BTC 4hr</p> : null}
        {credential.isSubscribedTo["LINK/BTC"]["6hr"] ? <p>Subscribed To: LINK/BTC 6hr</p> : null}
        {credential.isSubscribedTo["LINK/BTC"]["12hr"] ? <p>Subscribed To: LINK/BTC 12hr</p> : null}

        {credential.isSubscribedTo["LINK/USD"]["1hr"] ? <p>Subscribed To: LINK/USD 1hr</p> : null}
        {credential.isSubscribedTo["LINK/USD"]["2hr"] ? <p>Subscribed To: LINK/USD 2hr</p> : null}
        {credential.isSubscribedTo["LINK/USD"]["4hr"] ? <p>Subscribed To: LINK/USD 4hr</p> : null}
        {credential.isSubscribedTo["LINK/USD"]["6hr"] ? <p>Subscribed To: LINK/USD 6hr</p> : null}
        {credential.isSubscribedTo["LINK/USD"]["12hr"] ? <p>Subscribed To: LINK/USD 12hr</p> : null}
      </div>
      <div>
        <p>MATIC: {credential["MATIC"]}</p>
        {credential.isSubscribedTo["MATIC/BTC"]["1hr"] ? <p>Subscribed To: MATIC/BTC 1hr</p> : null}
        {credential.isSubscribedTo["MATIC/BTC"]["2hr"] ? <p>Subscribed To: MATIC/BTC 2hr</p> : null}
        {credential.isSubscribedTo["MATIC/BTC"]["4hr"] ? <p>Subscribed To: MATIC/BTC 4hr</p> : null}
        {credential.isSubscribedTo["MATIC/BTC"]["6hr"] ? <p>Subscribed To: MATIC/BTC 6hr</p> : null}
        {credential.isSubscribedTo["MATIC/BTC"]["12hr"] ? <p>Subscribed To: MATIC/BTC 12hr</p> : null}

        {credential.isSubscribedTo["MATIC/USD"]["1hr"] ? <p>Subscribed To: MATIC/USD 1hr</p> : null}
        {credential.isSubscribedTo["MATIC/USD"]["2hr"] ? <p>Subscribed To: MATIC/USD 2hr</p> : null}
        {credential.isSubscribedTo["MATIC/USD"]["4hr"] ? <p>Subscribed To: MATIC/USD 4hr</p> : null}
        {credential.isSubscribedTo["MATIC/USD"]["6hr"] ? <p>Subscribed To: MATIC/USD 6hr</p> : null}
        {credential.isSubscribedTo["MATIC/USD"]["12hr"] ? <p>Subscribed To: MATIC/USD 12hr</p> : null}
      </div>
      <div>
        <p>SOL: {credential["SOL"]}</p>
        {credential.isSubscribedTo["SOL/BTC"]["1hr"] ? <p>Subscribed To: SOL/BTC 1hr</p> : null}
        {credential.isSubscribedTo["SOL/BTC"]["2hr"] ? <p>Subscribed To: SOL/BTC 2hr</p> : null}
        {credential.isSubscribedTo["SOL/BTC"]["4hr"] ? <p>Subscribed To: SOL/BTC 4hr</p> : null}
        {credential.isSubscribedTo["SOL/BTC"]["6hr"] ? <p>Subscribed To: SOL/BTC 6hr</p> : null}
        {credential.isSubscribedTo["SOL/BTC"]["12hr"] ? <p>Subscribed To: SOL/BTC 12hr</p> : null}

        {credential.isSubscribedTo["SOL/USD"]["1hr"] ? <p>Subscribed To: SOL/USD 1hr</p> : null}
        {credential.isSubscribedTo["SOL/USD"]["2hr"] ? <p>Subscribed To: SOL/USD 2hr</p> : null}
        {credential.isSubscribedTo["SOL/USD"]["4hr"] ? <p>Subscribed To: SOL/USD 4hr</p> : null}
        {credential.isSubscribedTo["SOL/USD"]["6hr"] ? <p>Subscribed To: SOL/USD 6hr</p> : null}
        {credential.isSubscribedTo["SOL/USD"]["12hr"] ? <p>Subscribed To: SOL/USD 12hr</p> : null}
      </div>
      <div>
        <p>UNI: {credential["UNI"]}</p>
        {credential.isSubscribedTo["UNI/BTC"]["1hr"] ? <p>Subscribed To: UNI/BTC 1hr</p> : null}
        {credential.isSubscribedTo["UNI/BTC"]["2hr"] ? <p>Subscribed To: UNI/BTC 2hr</p> : null}
        {credential.isSubscribedTo["UNI/BTC"]["4hr"] ? <p>Subscribed To: UNI/BTC 4hr</p> : null}
        {credential.isSubscribedTo["UNI/BTC"]["6hr"] ? <p>Subscribed To: UNI/BTC 6hr</p> : null}
        {credential.isSubscribedTo["UNI/BTC"]["12hr"] ? <p>Subscribed To: UNI/BTC 12hr</p> : null}

        {credential.isSubscribedTo["UNI/USD"]["1hr"] ? <p>Subscribed To: UNI/USD 1hr</p> : null}
        {credential.isSubscribedTo["UNI/USD"]["2hr"] ? <p>Subscribed To: UNI/USD 2hr</p> : null}
        {credential.isSubscribedTo["UNI/USD"]["4hr"] ? <p>Subscribed To: UNI/USD 4hr</p> : null}
        {credential.isSubscribedTo["UNI/USD"]["6hr"] ? <p>Subscribed To: UNI/USD 6hr</p> : null}
        {credential.isSubscribedTo["UNI/USD"]["12hr"] ? <p>Subscribed To: UNI/USD 12hr</p> : null}
      </div>
    </div>
  </div>
)

export default Dashboard;
