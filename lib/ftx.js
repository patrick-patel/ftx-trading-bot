const axios = require('axios');
const config = require('../config.js');

const { RestClient } = require('ftx-api');

const key = config.API_KEY;
const secret = config.secret;

const restClientOptions = {
  domain: 'ftxus',
  subAccountName: 'sub1'
};

const client = new RestClient(key, secret, restClientOptions);

let getAccountValue = () => {
  console.log('retrieving account value from ftx');
  return client.getBalances();
}

let postMarketSellOrder = () => {
  console.log('retrieving account value from ftx');
  return client.getBalances();
}

let postStopMarketBuyOrder = () => {
  console.log('posting stop market buy order');
  return client.getBalances();
}

let postStopMarketSellOrder = () => {
  console.log('posting stop market sell order');
  return client.getBalances();
}

let getCandle = () => {
  console.log('retrieving next candle info');
  var end_time = new Date().getTime();
  var start_time = end_time - 60000 // change to 3600000
  client.getHistoricalPrices({
    'market_name': 'LINK/BTC',
    'resolution': 60, // change to 3600
    'start_time': start_time,
    'end_time': end_time
  })
}

module.exports.getAccountValue = getAccountValue;
module.exports.postMarketSellOrder = postMarketSellOrder;
module.exports.postStopMarketBuyOrder = postStopMarketBuyOrder;
module.exports.postStopMarketSellOrder = postStopMarketSellOrder;
module.exports.getCandle = getCandle;

