import React from 'react';
import { Col, Row } from 'react-bootstrap';


const Dashboard = ({ credential }) => (
  <>
    <Row>
      <Col>
        <Row>
          <h6 className="display-6">{credential.subAccountName}</h6>
          <p className="lead">{credential.api_key}</p>
        </Row>
        <Row>
          <Col>
            <p className="lead">ETH: {credential["ETH"]}</p>
          </Col>
          <Col>
            <p className="lead">LINK: {credential["LINK"]}</p>
          </Col>
          <Col>
            <p className="lead">MATIC: {credential["MATIC"]}</p>
          </Col>
          <Col>
            <p className="lead">SOL: {credential["SOL"]}</p>
          </Col>
          <Col>
            <p className="lead">UNI: {credential["UNI"]}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {credential.isSubscribedTo["ETH/BTC"]["1hr"] ? <p className="lead">Subscribed To: ETH/BTC 1hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["2hr"] ? <p className="lead">Subscribed To: ETH/BTC 2hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["4hr"] ? <p className="lead">Subscribed To: ETH/BTC 4hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["6hr"] ? <p className="lead">Subscribed To: ETH/BTC 6hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["12hr"] ? <p className="lead">Subscribed To: ETH/BTC 12hr</p> : null}

              {credential.isSubscribedTo["ETH/USD"]["1hr"] ? <p className="lead">Subscribed To: ETH/USD 1hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["2hr"] ? <p className="lead">Subscribed To: ETH/USD 2hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["4hr"] ? <p className="lead">Subscribed To: ETH/USD 4hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["6hr"] ? <p className="lead">Subscribed To: ETH/USD 6hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["12hr"] ? <p className="lead">Subscribed To: ETH/USD 12hr</p> : null}
            </div>
          </Col>
          <Col>
            <div>
              {credential.isSubscribedTo["LINK/BTC"]["1hr"] ? <p className="lead">Subscribed To: LINK/BTC 1hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["2hr"] ? <p className="lead">Subscribed To: LINK/BTC 2hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["4hr"] ? <p className="lead">Subscribed To: LINK/BTC 4hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["6hr"] ? <p className="lead">Subscribed To: LINK/BTC 6hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["12hr"] ? <p className="lead">Subscribed To: LINK/BTC 12hr</p> : null}

              {credential.isSubscribedTo["LINK/USD"]["1hr"] ? <p className="lead">Subscribed To: LINK/USD 1hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["2hr"] ? <p className="lead">Subscribed To: LINK/USD 2hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["4hr"] ? <p className="lead">Subscribed To: LINK/USD 4hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["6hr"] ? <p className="lead">Subscribed To: LINK/USD 6hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["12hr"] ? <p className="lead">Subscribed To: LINK/USD 12hr</p> : null}
            </div>
          </Col>
          <Col>
            <div>
              {credential.isSubscribedTo["MATIC/BTC"]["1hr"] ? <p className="lead">Subscribed To: MATIC/BTC 1hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["2hr"] ? <p className="lead">Subscribed To: MATIC/BTC 2hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["4hr"] ? <p className="lead">Subscribed To: MATIC/BTC 4hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["6hr"] ? <p className="lead">Subscribed To: MATIC/BTC 6hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["12hr"] ? <p className="lead">Subscribed To: MATIC/BTC 12hr</p> : null}

              {credential.isSubscribedTo["MATIC/USD"]["1hr"] ? <p className="lead">Subscribed To: MATIC/USD 1hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["2hr"] ? <p className="lead">Subscribed To: MATIC/USD 2hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["4hr"] ? <p className="lead">Subscribed To: MATIC/USD 4hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["6hr"] ? <p className="lead">Subscribed To: MATIC/USD 6hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["12hr"] ? <p className="lead">Subscribed To: MATIC/USD 12hr</p> : null}
            </div>
          </Col>
          <Col>
            <div>
              {credential.isSubscribedTo["SOL/BTC"]["1hr"] ? <p className="lead">Subscribed To: SOL/BTC 1hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["2hr"] ? <p className="lead">Subscribed To: SOL/BTC 2hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["4hr"] ? <p className="lead">Subscribed To: SOL/BTC 4hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["6hr"] ? <p className="lead">Subscribed To: SOL/BTC 6hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["12hr"] ? <p className="lead">Subscribed To: SOL/BTC 12hr</p> : null}

              {credential.isSubscribedTo["SOL/USD"]["1hr"] ? <p className="lead">Subscribed To: SOL/USD 1hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["2hr"] ? <p className="lead">Subscribed To: SOL/USD 2hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["4hr"] ? <p className="lead">Subscribed To: SOL/USD 4hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["6hr"] ? <p className="lead">Subscribed To: SOL/USD 6hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["12hr"] ? <p className="lead">Subscribed To: SOL/USD 12hr</p> : null}
            </div>
          </Col>
          <Col>
            <div>
              {credential.isSubscribedTo["UNI/BTC"]["1hr"] ? <p className="lead">Subscribed To: UNI/BTC 1hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["2hr"] ? <p className="lead">Subscribed To: UNI/BTC 2hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["4hr"] ? <p className="lead">Subscribed To: UNI/BTC 4hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["6hr"] ? <p className="lead">Subscribed To: UNI/BTC 6hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["12hr"] ? <p className="lead">Subscribed To: UNI/BTC 12hr</p> : null}

              {credential.isSubscribedTo["UNI/USD"]["1hr"] ? <p className="lead">Subscribed To: UNI/USD 1hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["2hr"] ? <p className="lead">Subscribed To: UNI/USD 2hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["4hr"] ? <p className="lead">Subscribed To: UNI/USD 4hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["6hr"] ? <p className="lead">Subscribed To: UNI/USD 6hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["12hr"] ? <p className="lead">Subscribed To: UNI/USD 12hr</p> : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <p className="lead">BTC: {credential["BTC"]}</p>
            </div>
          </Col>
          <Col>
            <div>
              <p className="lead">USD: {credential["USD"]}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="lead">Account Value in USD:  {credential.total}</p>
          </Col>
        </Row>
      </Col>
    </Row>

    <hr></hr>
  </>
)

export default Dashboard;
