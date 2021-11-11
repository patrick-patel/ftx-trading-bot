import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Container, Image, Row } from 'react-bootstrap';

class GettingStarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/settings' />
    }
    return (
      <div>
        <Container>
          <br></br>
          <h5 className="display-5">Getting Started</h5>
          <Row>
            <p className="lead">Step 1: Create a subaccount on FTX</p>
            <Image src="" fluid />
            <p className="font-weight-light font-italic">You can setup multiple subaccounts to run different trading pairs or time frames.</p>
          </Row>
          <Row>
            <p className="lead">Step 2: Create an API Key</p>
            <Image src="" fluid />
            <p className="font-weight-light font-italic">Only create one api key per subaccount you setup with this bot.</p>
          </Row>
          <Row>
            <p className="lead">Step 3: Enter API Key under the settings tab</p>
            <Image src="" fluid />
            <p className="font-weight-light font-italic">If you are using FTX US make sure to check next to "FTX US".</p>
          </Row>
          <Row>
            <p className="lead">Step 4: Define your trading pairs</p>
            <Image src="" fluid />
            <p className="font-weight-light font-italic">You can setup the bot to trade as many or as few coins as you'd like, but must choose between USD or BTC for each coin.</p>
          </Row>
          <Row>
            <p className="lead">Step 5: Fund your subaccount with USD, BTC or Both</p>
            <Image src="" fluid />
            <p className="font-weight-light font-italic">Make sure to add the appropriate base asset depending on the pairs you subscribed to.</p>
          </Row>
          <Row>
            <p className="lead">Step 6: Sit back and let the bot grow your account</p>
          </Row>

        </Container>
      </div>
    )
  }
}

export default GettingStarted;