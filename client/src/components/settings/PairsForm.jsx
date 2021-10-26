import React from 'react';

const PairsForm = (props) => (
  <div>
    <p>{this.state.apiValue ? <label for="ETH/BTC"><b>ETH/BTC Pair</b></label> : null}</p>
    <div>
      {this.state.apiValue ? <input type="radio" name="ETH/BTC" value={this.state.["ETH/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
    </div>

    <p>{this.state.apiValue ? <label for="LINK/BTC"><b>LINK/BTC Pair</b></label> : null}</p>
    <div>
      {this.state.apiValue ? <input type="radio" name="LINK/BTC" value={this.state.["LINK/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
    </div>

    <p>{this.state.apiValue ? <label for="MATIC/BTC"><b>MATIC/BTC Pair</b></label> : null}</p>
    <div>
      {this.state.apiValue ? <input type="radio" name="MATIC/BTC" value={this.state.["MATIC/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
    </div>

    <p>{this.state.apiValue ? <label for="SOL/BTC"><b>SOL/BTC Pair</b></label> : null}</p>
    <div>
      {this.state.apiValue ? <input type="radio" name="SOL/BTC" value={this.state.["SOL/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
    </div>

    <p>{this.state.apiValue ? <label for="SUSHI/BTC"><b>SUSHI/BTC Pair</b></label> : null}</p>
    <div>
      {this.state.apiValue ? <input type="radio" name="SUSHI/BTC" value={this.state.["SUSHI/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
    </div>

    <p>{this.state.apiValue ? <label for="UNI/BTC"><b>UNI/BTC Pair</b></label> : null}</p>
    <div>
      {this.state.apiValue ? <input type="radio" name="UNI/BTC" value={this.state.["UNI/BTC"]} onChange={this.onChangeRadio.bind(this)} required></input> : null}
    </div>
    {this.state.apiValue ? <button type="submit" onClick={this.submitPairs.bind(this)}>Submit</button> : null}
  </div>

)

export default APIs;