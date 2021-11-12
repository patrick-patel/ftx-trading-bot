import React from 'react';
import { Chart } from "react-google-charts";
import { Col, Row, Table } from 'react-bootstrap';


const Dashboard = ({ credential }) => (
  <>
    <Row bg="dark" text="white">
      <h6 className="display-6">{credential.subAccountName}</h6>
      <p className="lead">{credential.api_key}</p>
    </Row>
    <Row>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>ETH</th>
            <th>LINK</th>
            <th>MATIC</th>
            <th>SOL</th>
            <th>UNI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Balance</td>
            <td>{credential["ETH"]}</td>
            <td>{credential["LINK"]}</td>
            <td>{credential["MATIC"]}</td>
            <td>{credential["SOL"]}</td>
            <td>{credential["UNI"]}</td>
          </tr>
          <tr>
            <td>Pair</td>
            {credential.isSubscribedTo["ETH/BTC"]["1hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["ETH/BTC"]["2hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["ETH/BTC"]["4hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["ETH/BTC"]["6hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["ETH/BTC"]["12hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["1hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["2hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["4hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["6hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["12hr"] ? <td>USD</td> : null}

            {credential.isSubscribedTo["LINK/BTC"]["1hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["LINK/BTC"]["2hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["LINK/BTC"]["4hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["LINK/BTC"]["6hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["LINK/BTC"]["12hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["1hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["2hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["4hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["6hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["12hr"] ? <td>USD</td> : null}

            {credential.isSubscribedTo["MATIC/BTC"]["1hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["MATIC/BTC"]["2hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["MATIC/BTC"]["4hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["MATIC/BTC"]["6hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["MATIC/BTC"]["12hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["1hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["2hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["4hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["6hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["12hr"] ? <td>USD</td> : null}

            {credential.isSubscribedTo["SOL/BTC"]["1hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["SOL/BTC"]["2hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["SOL/BTC"]["4hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["SOL/BTC"]["6hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["SOL/BTC"]["12hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["1hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["2hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["4hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["6hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["12hr"] ? <td>USD</td> : null}

            {credential.isSubscribedTo["UNI/BTC"]["1hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["UNI/BTC"]["2hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["UNI/BTC"]["4hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["UNI/BTC"]["6hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["UNI/BTC"]["12hr"] ? <td>BTC</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["1hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["2hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["4hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["6hr"] ? <td>USD</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["12hr"] ? <td>USD</td> : null}
          </tr>
          <tr>
            <td>Time Frame</td>
            {credential.isSubscribedTo["ETH/BTC"]["1hr"] ? <td> 1hr</td> : null}
            {credential.isSubscribedTo["ETH/BTC"]["2hr"] ? <td> 2hr</td> : null}
            {credential.isSubscribedTo["ETH/BTC"]["4hr"] ? <td> 4hr</td> : null}
            {credential.isSubscribedTo["ETH/BTC"]["6hr"] ? <td> 6hr</td> : null}
            {credential.isSubscribedTo["ETH/BTC"]["12hr"] ? <td>12hr</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["1hr"] ? <td>1hr</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["2hr"] ? <td>2hr</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["4hr"] ? <td>4hr</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["6hr"] ? <td>6hr</td> : null}
            {credential.isSubscribedTo["ETH/USD"]["12hr"] ? <td>12hr</td> : null}

            {credential.isSubscribedTo["LINK/BTC"]["1hr"] ? <td>1hr</td> : null}
            {credential.isSubscribedTo["LINK/BTC"]["2hr"] ? <td>2hr</td> : null}
            {credential.isSubscribedTo["LINK/BTC"]["4hr"] ? <td>4hr</td> : null}
            {credential.isSubscribedTo["LINK/BTC"]["6hr"] ? <td>6hr</td> : null}
            {credential.isSubscribedTo["LINK/BTC"]["12hr"] ? <td>12hr</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["1hr"] ? <td>1hr</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["2hr"] ? <td>2hr</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["4hr"] ? <td>4hr</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["6hr"] ? <td>6hr</td> : null}
            {credential.isSubscribedTo["LINK/USD"]["12hr"] ? <td>12hr</td> : null}

            {credential.isSubscribedTo["MATIC/BTC"]["1hr"] ? <td>1hr</td> : null}
            {credential.isSubscribedTo["MATIC/BTC"]["2hr"] ? <td>2hr</td> : null}
            {credential.isSubscribedTo["MATIC/BTC"]["4hr"] ? <td>4hr</td> : null}
            {credential.isSubscribedTo["MATIC/BTC"]["6hr"] ? <td>6hr</td> : null}
            {credential.isSubscribedTo["MATIC/BTC"]["12hr"] ? <td>12hr</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["1hr"] ? <td>1hr</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["2hr"] ? <td>2hr</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["4hr"] ? <td>4hr</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["6hr"] ? <td>6hr</td> : null}
            {credential.isSubscribedTo["MATIC/USD"]["12hr"] ? <td>12hr</td> : null}

            {credential.isSubscribedTo["SOL/BTC"]["1hr"] ? <td>1hr</td> : null}
            {credential.isSubscribedTo["SOL/BTC"]["2hr"] ? <td>2hr</td> : null}
            {credential.isSubscribedTo["SOL/BTC"]["4hr"] ? <td>4hr</td> : null}
            {credential.isSubscribedTo["SOL/BTC"]["6hr"] ? <td>6hr</td> : null}
            {credential.isSubscribedTo["SOL/BTC"]["12hr"] ? <td>12hr</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["1hr"] ? <td>1hr</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["2hr"] ? <td>2hr</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["4hr"] ? <td>4hr</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["6hr"] ? <td>6hr</td> : null}
            {credential.isSubscribedTo["SOL/USD"]["12hr"] ? <td>12hr</td> : null}

            {credential.isSubscribedTo["UNI/BTC"]["1hr"] ? <td>1hr</td> : null}
            {credential.isSubscribedTo["UNI/BTC"]["2hr"] ? <td>2hr</td> : null}
            {credential.isSubscribedTo["UNI/BTC"]["4hr"] ? <td>4hr</td> : null}
            {credential.isSubscribedTo["UNI/BTC"]["6hr"] ? <td>6hr</td> : null}
            {credential.isSubscribedTo["UNI/BTC"]["12hr"] ? <td>12hr</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["1hr"] ? <td>1hr</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["2hr"] ? <td>2hr</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["4hr"] ? <td>4hr</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["6hr"] ? <td>6hr</td> : null}
            {credential.isSubscribedTo["UNI/USD"]["12hr"] ? <td>12hr</td> : null}
          </tr>
        </tbody>
      </Table>
    </Row>
    <Row bg="dark" text="white">
      <Col className="border-top">
        <p className="lead">BTC: {credential["BTC"]}</p>
      </Col>
      <Col className="border-top">
        <p className="lead">USD: {credential["USD"]}</p>
      </Col>
    </Row>
    <Row bg="dark" text="white">
      <Col className="border-top">
        <p className="lead">Account Value in USD: {credential.total}</p>
      </Col>
    </Row>
    <Row  bg="dark" text="white">
      <Chart
        height={'300px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['x', credential.subAccountName],
          [1, credential.chartData[0]],
          [2, credential.chartData[1]],
          [3, credential.chartData[2]],
          [4, credential.chartData[3]],
          [5, credential.chartData[4]],
          [6, credential.chartData[5]],
          [7, credential.chartData[6]],
          [8, credential.chartData[7]],
          [9, credential.chartData[8]],
          [10, credential.chartData[9]],
          [11, credential.chartData[10]],
          [12, credential.chartData[11]],
        ]}
        options={{
          hAxis: {
            title: 'Day',
          },
          vAxis: {
            title: 'USD',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </Row>
    <hr></hr>
  </>
)

export default Dashboard;
