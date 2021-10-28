import React from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';

const PairsForm = (props) => (
  <div>
    <p><label for="ETH/BTC"><b>ETH/BTC Pair</b></label></p>
    <div>
      <ButtonGroup>
        <Button onClick={props.onPairChange("ETH/BTC", "off")} active={props.state["ETH/BTC"] === "off"}>Off</Button>
        <Button onClick={props.onPairChange("ETH/BTC", "1hr")} active={props.state["ETH/BTC"] === "1hr"}>1hr</Button>
        <Button onClick={props.onPairChange("ETH/BTC", "2hr")} active={props.state["ETH/BTC"] === "2hr"}>2hr</Button>
        <Button onClick={props.onPairChange("ETH/BTC", "4hr")} active={props.state["ETH/BTC"] === "4hr"}>4hr</Button>
        <Button onClick={props.onPairChange("ETH/BTC", "6hr")} active={props.state["ETH/BTC"] === "6hr"}>6hr</Button>
        <Button onClick={props.onPairChange("ETH/BTC", "12hr")} active={props.state["ETH/BTC"] === "12hr"}>12hr</Button>
      </ButtonGroup>
    </div>

    <p><label for="LINK/BTC"><b>LINK/BTC Pair</b></label></p>
    <div>
      <ButtonGroup>
        <Button onClick={props.onPairChange("LINK/BTC", "off")} active={props.state["LINK/BTC"] === "off"}>Off</Button>
        <Button onClick={props.onPairChange("LINK/BTC", "1hr")} active={props.state["LINK/BTC"] === "1hr"}>1hr</Button>
        <Button onClick={props.onPairChange("LINK/BTC", "2hr")} active={props.state["LINK/BTC"] === "2hr"}>2hr</Button>
        <Button onClick={props.onPairChange("LINK/BTC", "4hr")} active={props.state["LINK/BTC"] === "4hr"}>4hr</Button>
        <Button onClick={props.onPairChange("LINK/BTC", "6hr")} active={props.state["LINK/BTC"] === "6hr"}>6hr</Button>
        <Button onClick={props.onPairChange("LINK/BTC", "12hr")} active={props.state["LINK/BTC"] === "12hr"}>12hr</Button>
      </ButtonGroup>
    </div>

    <p><label for="MATIC/BTC"><b>MATIC/BTC Pair</b></label></p>
    <div>
      <ButtonGroup>
        <Button onClick={props.onPairChange("MATIC/BTC", "off")} active={props.state["MATIC/BTC"] === "off"}>Off</Button>
        <Button onClick={props.onPairChange("MATIC/BTC", "1hr")} active={props.state["MATIC/BTC"] === "1hr"}>1hr</Button>
        <Button onClick={props.onPairChange("MATIC/BTC", "2hr")} active={props.state["MATIC/BTC"] === "2hr"}>2hr</Button>
        <Button onClick={props.onPairChange("MATIC/BTC", "4hr")} active={props.state["MATIC/BTC"] === "4hr"}>4hr</Button>
        <Button onClick={props.onPairChange("MATIC/BTC", "6hr")} active={props.state["MATIC/BTC"] === "6hr"}>6hr</Button>
        <Button onClick={props.onPairChange("MATIC/BTC", "12hr")} active={props.state["MATIC/BTC"] === "12hr"}>12hr</Button>
      </ButtonGroup>
    </div>

    <p><label for="SOL/BTC"><b>SOL/BTC Pair</b></label></p>
    <div>
      <ButtonGroup>
        <Button onClick={props.onPairChange("SOL/BTC", "off")} active={props.state["SOL/BTC"] === "off"}>Off</Button>
        <Button onClick={props.onPairChange("SOL/BTC", "1hr")} active={props.state["SOL/BTC"] === "1hr"}>1hr</Button>
        <Button onClick={props.onPairChange("SOL/BTC", "2hr")} active={props.state["SOL/BTC"] === "2hr"}>2hr</Button>
        <Button onClick={props.onPairChange("SOL/BTC", "4hr")} active={props.state["SOL/BTC"] === "4hr"}>4hr</Button>
        <Button onClick={props.onPairChange("SOL/BTC", "6hr")} active={props.state["SOL/BTC"] === "6hr"}>6hr</Button>
        <Button onClick={props.onPairChange("SOL/BTC", "12hr")} active={props.state["SOL/BTC"] === "12hr"}>12hr</Button>
      </ButtonGroup>
    </div>

    <p><label for="SUSHI/BTC"><b>SUSHI/BTC Pair</b></label></p>
    <div>
      <ButtonGroup>
        <Button onClick={props.onPairChange("SUSHI/BTC", "off")} active={props.state["SUSHI/BTC"] === "off"}>Off</Button>
        <Button onClick={props.onPairChange("SUSHI/BTC", "1hr")} active={props.state["SUSHI/BTC"] === "1hr"}>1hr</Button>
        <Button onClick={props.onPairChange("SUSHI/BTC", "2hr")} active={props.state["SUSHI/BTC"] === "2hr"}>2hr</Button>
        <Button onClick={props.onPairChange("SUSHI/BTC", "4hr")} active={props.state["SUSHI/BTC"] === "4hr"}>4hr</Button>
        <Button onClick={props.onPairChange("SUSHI/BTC", "6hr")} active={props.state["SUSHI/BTC"] === "6hr"}>6hr</Button>
        <Button onClick={props.onPairChange("SUSHI/BTC", "12hr")} active={props.state["SUSHI/BTC"] === "12hr"}>12hr</Button>
      </ButtonGroup>
    </div>

    <p><label for="UNI/BTC"><b>UNI/BTC Pair</b></label></p>
    <div>
      <ButtonGroup>
        <Button onClick={props.onPairChange("UNI/BTC", "off")} active={props.state["UNI/BTC"] === "off"}>Off</Button>
        <Button onClick={props.onPairChange("UNI/BTC", "1hr")} active={props.state["UNI/BTC"] === "1hr"}>1hr</Button>
        <Button onClick={props.onPairChange("UNI/BTC", "2hr")} active={props.state["UNI/BTC"] === "2hr"}>2hr</Button>
        <Button onClick={props.onPairChange("UNI/BTC", "4hr")} active={props.state["UNI/BTC"] === "4hr"}>4hr</Button>
        <Button onClick={props.onPairChange("UNI/BTC", "6hr")} active={props.state["UNI/BTC"] === "6hr"}>6hr</Button>
        <Button onClick={props.onPairChange("UNI/BTC", "12hr")} active={props.state["UNI/BTC"] === "12hr"}>12hr</Button>
      </ButtonGroup>
    </div>
    <button type="submit" onClick={props.submitPairs}>Submit</button>
  </div>

)

export default PairsForm;