import React from 'react';

const PairsForm = (props) => (
  <div>
    <p><label for="ETH/BTC"><b>ETH/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="ETH/BTC" onChange={props.onChangeRadio} required></input>
    </div>

    <p><label for="LINK/BTC"><b>LINK/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="LINK/BTC" onChange={props.onChangeRadio} required></input>
    </div>

    <p><label for="MATIC/BTC"><b>MATIC/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="MATIC/BTC" onChange={props.onChangeRadio} required></input>
    </div>

    <p><label for="SOL/BTC"><b>SOL/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="SOL/BTC" onChange={props.onChangeRadio} required></input>
    </div>

    <p><label for="SUSHI/BTC"><b>SUSHI/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="SUSHI/BTC" onChange={props.onChangeRadio} required></input>
    </div>

    <p><label for="UNI/BTC"><b>UNI/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="UNI/BTC" onChange={props.onChangeRadio} required></input>
    </div>
    <button type="submit" onClick={props.submitPairs}>Submit</button>
  </div>

)

export default PairsForm;