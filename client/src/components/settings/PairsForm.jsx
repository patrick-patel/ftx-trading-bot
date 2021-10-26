import React from 'react';

const PairsForm = ({ethbtc, linkbtc, maticbtc, solbtc, sushibtc, unibtc}) => (
  <div>
    <p><label for="ETH/BTC"><b>ETH/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="ETH/BTC" value={ethbtc} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="LINK/BTC"><b>LINK/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="LINK/BTC" value={linkbtc} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="MATIC/BTC"><b>MATIC/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="MATIC/BTC" value={maticbtc} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="SOL/BTC"><b>SOL/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="SOL/BTC" value={solbtc} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="SUSHI/BTC"><b>SUSHI/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="SUSHI/BTC" value={sushibtc} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>

    <p><label for="UNI/BTC"><b>UNI/BTC Pair</b></label></p>
    <div>
      <input type="radio" name="UNI/BTC" value={unibtc} onChange={this.onChangeRadio.bind(this)} required></input>
    </div>
    <button type="submit" onClick={this.submitPairs.bind(this)}>Submit</button>
  </div>

)

export default PairsForm;