import React from 'react';
import { Chart } from "react-google-charts";
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
          <Col className="border-end border-top">
            <p className="lead">ETH: {credential["ETH"]}</p>
          </Col>
          <Col className="border-end border-top">
            <p className="lead">LINK: {credential["LINK"]}</p>
          </Col>
          <Col className="border-end border-top">
            <p className="lead">MATIC: {credential["MATIC"]}</p>
          </Col>
          <Col className="border-end border-top">
            <p className="lead">SOL: {credential["SOL"]}</p>
          </Col>
          <Col className="border-top">
            <p className="lead">UNI: {credential["UNI"]}</p>
          </Col>
        </Row>
        <Row>
          <Col className="border-end border-top">
            <div>
              {credential.isSubscribedTo["ETH/BTC"]["1hr"] ? <p className="lead">BTC 1hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["2hr"] ? <p className="lead">BTC 2hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["4hr"] ? <p className="lead">BTC 4hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["6hr"] ? <p className="lead">BTC 6hr</p> : null}
              {credential.isSubscribedTo["ETH/BTC"]["12hr"] ? <p className="lead">BTC 12hr</p> : null}

              {credential.isSubscribedTo["ETH/USD"]["1hr"] ? <p className="lead">USD 1hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["2hr"] ? <p className="lead">USD 2hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["4hr"] ? <p className="lead">USD 4hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["6hr"] ? <p className="lead">USD 6hr</p> : null}
              {credential.isSubscribedTo["ETH/USD"]["12hr"] ? <p className="lead">USD 12hr</p> : null}
            </div>
          </Col>
          <Col className="border-end border-top">
            <div>
              {credential.isSubscribedTo["LINK/BTC"]["1hr"] ? <p className="lead">BTC 1hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["2hr"] ? <p className="lead">BTC 2hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["4hr"] ? <p className="lead">BTC 4hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["6hr"] ? <p className="lead">BTC 6hr</p> : null}
              {credential.isSubscribedTo["LINK/BTC"]["12hr"] ? <p className="lead">BTC 12hr</p> : null}

              {credential.isSubscribedTo["LINK/USD"]["1hr"] ? <p className="lead">USD 1hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["2hr"] ? <p className="lead">USD 2hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["4hr"] ? <p className="lead">USD 4hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["6hr"] ? <p className="lead">USD 6hr</p> : null}
              {credential.isSubscribedTo["LINK/USD"]["12hr"] ? <p className="lead">USD 12hr</p> : null}
            </div>
          </Col>
          <Col className="border-end border-top">
            <div>
              {credential.isSubscribedTo["MATIC/BTC"]["1hr"] ? <p className="lead">BTC 1hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["2hr"] ? <p className="lead">BTC 2hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["4hr"] ? <p className="lead">BTC 4hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["6hr"] ? <p className="lead">BTC 6hr</p> : null}
              {credential.isSubscribedTo["MATIC/BTC"]["12hr"] ? <p className="lead">BTC 12hr</p> : null}

              {credential.isSubscribedTo["MATIC/USD"]["1hr"] ? <p className="lead">USD 1hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["2hr"] ? <p className="lead">USD 2hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["4hr"] ? <p className="lead">USD 4hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["6hr"] ? <p className="lead">USD 6hr</p> : null}
              {credential.isSubscribedTo["MATIC/USD"]["12hr"] ? <p className="lead">USD 12hr</p> : null}
            </div>
          </Col>
          <Col className="border-end border-top">
            <div>
              {credential.isSubscribedTo["SOL/BTC"]["1hr"] ? <p className="lead">BTC 1hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["2hr"] ? <p className="lead">BTC 2hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["4hr"] ? <p className="lead">BTC 4hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["6hr"] ? <p className="lead">BTC 6hr</p> : null}
              {credential.isSubscribedTo["SOL/BTC"]["12hr"] ? <p className="lead">BTC 12hr</p> : null}

              {credential.isSubscribedTo["SOL/USD"]["1hr"] ? <p className="lead">USD 1hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["2hr"] ? <p className="lead">USD 2hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["4hr"] ? <p className="lead">USD 4hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["6hr"] ? <p className="lead">USD 6hr</p> : null}
              {credential.isSubscribedTo["SOL/USD"]["12hr"] ? <p className="lead">USD 12hr</p> : null}
            </div>
          </Col>
          <Col className="border-top">
            <div>
              {credential.isSubscribedTo["UNI/BTC"]["1hr"] ? <p className="lead">BTC 1hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["2hr"] ? <p className="lead">BTC 2hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["4hr"] ? <p className="lead">BTC 4hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["6hr"] ? <p className="lead">BTC 6hr</p> : null}
              {credential.isSubscribedTo["UNI/BTC"]["12hr"] ? <p className="lead">BTC 12hr</p> : null}

              {credential.isSubscribedTo["UNI/USD"]["1hr"] ? <p className="lead">USD 1hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["2hr"] ? <p className="lead">USD 2hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["4hr"] ? <p className="lead">USD 4hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["6hr"] ? <p className="lead">USD 6hr</p> : null}
              {credential.isSubscribedTo["UNI/USD"]["12hr"] ? <p className="lead">USD 12hr</p> : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="border-end">
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
          <Col className="border-top">
            <p className="lead">Account Value in USD: {credential.total}</p>
          </Col>
        </Row>
      </Col>
      <Col className="border">
        <Chart
          width={'600px'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9],
            [6, 11],
            [7, 27],
            [8, 33],
            [9, 40],
            [10, 32],
            [11, 35],
          ]}
          options={{
            hAxis: {
              title: 'Week',
            },
            vAxis: {
              title: 'USD',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </Col>
    </Row>
    <hr></hr>
  </>
)

export default Dashboard;
