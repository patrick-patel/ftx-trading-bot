import React from 'react';
import {Col, ButtonGroup, Button, Row} from 'react-bootstrap';

const PairsForm = (props) => (
  <div>
    <p><label for="ETH"><b>ETH - Set To: {props.state["ETH/BTC"] === "off" ? props.state["ETH/USD"] : props.state["ETH/BTC"]}</b></label></p>
    <div>
      <Row>
        <ButtonGroup className="d-grid gap-2 mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => {
                                  props.onPairChange("ETH/BTC", "off");
                                  props.onPairChange("ETH/USD", "off");
                                }} active={props.state["ETH/BTC"] === "off" && props.state["ETH/USD"] === "off"}>Off</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/BTC", "1hr")} active={props.state["ETH/BTC"] === "1hr"}>ETH/BTC 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/BTC", "2hr")} active={props.state["ETH/BTC"] === "2hr"}>ETH/BTC 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/BTC", "4hr")} active={props.state["ETH/BTC"] === "4hr"}>ETH/BTC 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/BTC", "6hr")} active={props.state["ETH/BTC"] === "6hr"}>ETH/BTC 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/BTC", "12hr")} active={props.state["ETH/BTC"] === "12hr"}>ETH/BTC 12hr</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/USD", "1hr")} active={props.state["ETH/USD"] === "1hr"}>ETH/USD 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/USD", "2hr")} active={props.state["ETH/USD"] === "2hr"}>ETH/USD 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/USD", "4hr")} active={props.state["ETH/USD"] === "4hr"}>ETH/USD 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/USD", "6hr")} active={props.state["ETH/USD"] === "6hr"}>ETH/USD 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("ETH/USD", "12hr")} active={props.state["ETH/USD"] === "12hr"}>ETH/USD 12hr</Button>
        </ButtonGroup>
      </Row>
    </div>

    <p><label for="LINK"><b>LINK - Set To: {props.state["LINK/BTC"]}</b></label></p>
    <div>
      <Row>
        <ButtonGroup className="d-grid gap-2 mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => {
                                  props.onPairChange("LINK/BTC", "off");
                                  props.onPairChange("LINK/USD", "off");
                                }} active={props.state["LINK/BTC"] === "off" && props.state["LINK/USD"] === "off"}>Off</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/BTC", "1hr")} active={props.state["LINK/BTC"] === "1hr"}>LINK/BTC 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/BTC", "2hr")} active={props.state["LINK/BTC"] === "2hr"}>LINK/BTC 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/BTC", "4hr")} active={props.state["LINK/BTC"] === "4hr"}>LINK/BTC 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/BTC", "6hr")} active={props.state["LINK/BTC"] === "6hr"}>LINK/BTC 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/BTC", "12hr")} active={props.state["LINK/BTC"] === "12hr"}>LINK/BTC 12hr</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/USD", "1hr")} active={props.state["LINK/USD"] === "1hr"}>LINK/USD 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/USD", "2hr")} active={props.state["LINK/USD"] === "2hr"}>LINK/USD 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/USD", "4hr")} active={props.state["LINK/USD"] === "4hr"}>LINK/USD 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/USD", "6hr")} active={props.state["LINK/USD"] === "6hr"}>LINK/USD 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("LINK/USD", "12hr")} active={props.state["LINK/USD"] === "12hr"}>LINK/USD 12hr</Button>
        </ButtonGroup>
      </Row>
    </div>

    <p><label for="MATIC"><b>MATIC - Set To: {props.state["MATIC/BTC"]}</b></label></p>
    <div>
      <Row>
        <ButtonGroup className="d-grid gap-2 mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => {
                                  props.onPairChange("MATIC/BTC", "off");
                                  props.onPairChange("MATIC/USD", "off");
                                }} active={props.state["MATIC/BTC"] === "off" && props.state["MATIC/USD"] === "off"}>Off</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/BTC", "1hr")} active={props.state["MATIC/BTC"] === "1hr"}>MATIC/BTC 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/BTC", "2hr")} active={props.state["MATIC/BTC"] === "2hr"}>MATIC/BTC 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/BTC", "4hr")} active={props.state["MATIC/BTC"] === "4hr"}>MATIC/BTC 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/BTC", "6hr")} active={props.state["MATIC/BTC"] === "6hr"}>MATIC/BTC 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/BTC", "12hr")} active={props.state["MATIC/BTC"] === "12hr"}>MATIC/BTC 12hr</Button>\
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/USD", "1hr")} active={props.state["MATIC/USD"] === "1hr"}>MATIC/USD 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/USD", "2hr")} active={props.state["MATIC/USD"] === "2hr"}>MATIC/USD 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/USD", "4hr")} active={props.state["MATIC/USD"] === "4hr"}>MATIC/USD 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/USD", "6hr")} active={props.state["MATIC/USD"] === "6hr"}>MATIC/USD 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("MATIC/USD", "12hr")} active={props.state["MATIC/USD"] === "12hr"}>MATIC/USD 12hr</Button>
        </ButtonGroup>
      </Row>
    </div>

    <p><label for="SOL"><b>SOL - Set To: {props.state["SOL/BTC"]}</b></label></p>
    <div>
      <Row>
        <ButtonGroup className="d-grid gap-2 mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => {
                                  props.onPairChange("SOL/BTC", "off");
                                  props.onPairChange("SOL/USD", "off");
                                }} active={props.state["SOL/BTC"] === "off" && props.state["SOL/USD"] === "off"}>Off</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/BTC", "1hr")} active={props.state["SOL/BTC"] === "1hr"}>SOL/BTC 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/BTC", "2hr")} active={props.state["SOL/BTC"] === "2hr"}>SOL/BTC 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/BTC", "4hr")} active={props.state["SOL/BTC"] === "4hr"}>SOL/BTC 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/BTC", "6hr")} active={props.state["SOL/BTC"] === "6hr"}>SOL/BTC 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/BTC", "12hr")} active={props.state["SOL/BTC"] === "12hr"}>SOL/BTC 12hr</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/USD", "1hr")} active={props.state["SOL/USD"] === "1hr"}>SOL/USD 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/USD", "2hr")} active={props.state["SOL/USD"] === "2hr"}>SOL/USD 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/USD", "4hr")} active={props.state["SOL/USD"] === "4hr"}>SOL/USD 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/USD", "6hr")} active={props.state["SOL/USD"] === "6hr"}>SOL/USD 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("SOL/USD", "12hr")} active={props.state["SOL/USD"] === "12hr"}>SOL/USD 12hr</Button>
        </ButtonGroup>
      </Row>
    </div>

    <p><label for="UNI"><b>UNI - Set To: {props.state["UNI/BTC"]}</b></label></p>
    <div>
      <Row>
        <ButtonGroup className="d-grid gap-2 mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => {
                                  props.onPairChange("UNI/BTC", "off");
                                  props.onPairChange("UNI/USD", "off");
                                }} active={props.state["UNI/BTC"] === "off" && props.state["UNI/USD"] === "off"}>Off</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/BTC", "1hr")} active={props.state["UNI/BTC"] === "1hr"}>UNI/BTC 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/BTC", "2hr")} active={props.state["UNI/BTC"] === "2hr"}>UNI/BTC 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/BTC", "4hr")} active={props.state["UNI/BTC"] === "4hr"}>UNI/BTC 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/BTC", "6hr")} active={props.state["UNI/BTC"] === "6hr"}>UNI/BTC 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/BTC", "12hr")} active={props.state["UNI/BTC"] === "12hr"}>UNI/BTC 12hr</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup className="mb-2" size="sm">
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/USD", "1hr")} active={props.state["UNI/USD"] === "1hr"}>UNI/USD 1hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/USD", "2hr")} active={props.state["UNI/USD"] === "2hr"}>UNI/USD 2hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/USD", "4hr")} active={props.state["UNI/USD"] === "4hr"}>UNI/USD 4hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/USD", "6hr")} active={props.state["UNI/USD"] === "6hr"}>UNI/USD 6hr</Button>
          <Button style={{cursor: "pointer"}} onClick={() => props.onPairChange("UNI/USD", "12hr")} active={props.state["UNI/USD"] === "12hr"}>UNI/USD 12hr</Button>
        </ButtonGroup>
      </Row>
    </div>
    <Button className="mb-2 mt-2" type="submit" style={{cursor: "pointer"}} onClick={props.submitPairs}>Submit</Button>
  </div>

)

export default PairsForm;