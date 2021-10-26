import React from 'react';

const PairsForm = (props) => (
  <div>
    <p><label for="ETH/BTC"><b>ETH/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="ETH/BTC" value={this.state.["ETH/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="LINK/BTC"><b>LINK/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="LINK/BTC" value={this.state.["LINK/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="MATIC/BTC"><b>MATIC/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="MATIC/BTC" value={this.state.["MATIC/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="SOL/BTC"><b>SOL/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="SOL/BTC" value={this.state.["SOL/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="SUSHI/BTC"><b>SUSHI/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="SUSHI/BTC" value={this.state.["SUSHI/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="UNI/BTC"><b>UNI/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="UNI/BTC" value={this.state.["UNI/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>
    <button type="submit" onClick={this.submitPairs.bind(this)}>Submit</button>
  </div>

)

export default PairsForm;