import React from 'react';
import { MDBContainer } from "mdbreact";
import { Line } from "react-chartjs-2";
import { Col, Row } from 'react-bootstrap';


const Dashboard = ({ credential, data }) => (
  <>
    <Row>
      <Col className="border">
        <Row>
          <h6 className="display-6">{credential.subAccountName}</h6>
          <p className="lead">{credential.api_key}</p>
        </Row>
        <Row>
          <Col className="border">
            <p className="lead">ETH: {credential["ETH"]}</p>
          </Col>
          <Col className="border">
            <p className="lead">LINK: {credential["LINK"]}</p>
          </Col>
          <Col className="border">
            <p className="lead">MATIC: {credential["MATIC"]}</p>
          </Col>
          <Col className="border">
            <p className="lead">SOL: {credential["SOL"]}</p>
          </Col>
          <Col className="border">
            <p className="lead">UNI: {credential["UNI"]}</p>
          </Col>
        </Row>
        <Row>
          <Col className="border">
            <div>
              {credential.isSubscribedTo["ETH/BTC"]["1hr"] ? <p className="lead">ETH/BTC 1hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["2hr"] ? <p className="lead">ETH/BTC 2hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["4hr"] ? <p className="lead">ETH/BTC 4hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["6hr"] ? <p className="lead">ETH/BTC 6hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["12hr"] ? <p className="lead">ETH/BTC 12hr</p> : null}

              {credential.isSubscribedTo["ETH/USD"]["1hr"] ? <p className="lead">ETH/USD 1hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["2hr"] ? <p className="lead">ETH/USD 2hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["4hr"] ? <p className="lead">ETH/USD 4hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["6hr"] ? <p className="lead">ETH/USD 6hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["12hr"] ? <p className="lead">ETH/USD 12hr</p> : null}
            </div>
          </Col>
          <Col className="border">
            <div>
              {credential.isSubscribedTo["LINK/BTC"]["1hr"] ? <p className="lead">LINK/BTC 1hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["2hr"] ? <p className="lead">LINK/BTC 2hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["4hr"] ? <p className="lead">LINK/BTC 4hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["6hr"] ? <p className="lead">LINK/BTC 6hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["12hr"] ? <p className="lead">LINK/BTC 12hr</p> : null}

              {credential.isSubscribedTo["LINK/USD"]["1hr"] ? <p className="lead">LINK/USD 1hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["2hr"] ? <p className="lead">LINK/USD 2hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["4hr"] ? <p className="lead">LINK/USD 4hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["6hr"] ? <p className="lead">LINK/USD 6hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["12hr"] ? <p className="lead">LINK/USD 12hr</p> : null}
            </div>
          </Col>
          <Col className="border">
            <div>
              {credential.isSubscribedTo["MATIC/BTC"]["1hr"] ? <p className="lead">MATIC/BTC 1hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["2hr"] ? <p className="lead">MATIC/BTC 2hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["4hr"] ? <p className="lead">MATIC/BTC 4hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["6hr"] ? <p className="lead">MATIC/BTC 6hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["12hr"] ? <p className="lead">MATIC/BTC 12hr</p> : null}

              {credential.isSubscribedTo["MATIC/USD"]["1hr"] ? <p className="lead">MATIC/USD 1hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["2hr"] ? <p className="lead">MATIC/USD 2hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["4hr"] ? <p className="lead">MATIC/USD 4hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["6hr"] ? <p className="lead">MATIC/USD 6hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["12hr"] ? <p className="lead">MATIC/USD 12hr</p> : null}
            </div>
          </Col>
          <Col className="border">
            <div>
              {credential.isSubscribedTo["SOL/BTC"]["1hr"] ? <p className="lead">SOL/BTC 1hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["2hr"] ? <p className="lead">SOL/BTC 2hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["4hr"] ? <p className="lead">SOL/BTC 4hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["6hr"] ? <p className="lead">SOL/BTC 6hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["12hr"] ? <p className="lead">SOL/BTC 12hr</p> : null}

              {credential.isSubscribedTo["SOL/USD"]["1hr"] ? <p className="lead">SOL/USD 1hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["2hr"] ? <p className="lead">SOL/USD 2hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["4hr"] ? <p className="lead">SOL/USD 4hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["6hr"] ? <p className="lead">SOL/USD 6hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["12hr"] ? <p className="lead">SOL/USD 12hr</p> : null}
            </div>
          </Col>
          <Col className="border">
            <div>
              {credential.isSubscribedTo["UNI/BTC"]["1hr"] ? <p className="lead">UNI/BTC 1hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["2hr"] ? <p className="lead">UNI/BTC 2hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["4hr"] ? <p className="lead">UNI/BTC 4hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["6hr"] ? <p className="lead">UNI/BTC 6hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["12hr"] ? <p className="lead">UNI/BTC 12hr</p> : null}

              {credential.isSubscribedTo["UNI/USD"]["1hr"] ? <p className="lead">UNI/USD 1hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["2hr"] ? <p className="lead">UNI/USD 2hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["4hr"] ? <p className="lead">UNI/USD 4hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["6hr"] ? <p className="lead">UNI/USD 6hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["12hr"] ? <p className="lead">UNI/USD 12hr</p> : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="border">
            <div>
              <p className="lead">BTC: {credential["BTC"]}</p>
            </div>
          </Col>
          <Col className="border">
            <div>
              <p className="lead">USD: {credential["USD"]}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="border">
            <p className="lead">Account Value in USD: {credential.total}</p>
          </Col>
        </Row>
      </Col>
      <Col className="border">
        <MDBContainer>
          <Line data={data} />
        </MDBContainer>
      </Col>
    </Row>
    <hr></hr>
  </>
)

export default Dashboard;
