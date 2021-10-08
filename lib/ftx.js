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

let postMarketSellOrder = (user) => {
  console.log('retrieving account value from ftx');
  return client.getBalances();
}

let postMarketBuyOrder = (user) => {
  console.log('retrieving account value from ftx');
  return client.getBalances();
}

let getNextCandle = (user) => {
  console.log('retrieving next candle info');
  var end_time = new Date().getTime();
  var start_time = end_time - 3600000
  client.getHistoricalPrices({
    'market_name': 'LINK/BTC',
    'resolution': 3600,
    'start_time': start_time,
    'end_time': end_time
  })
}

module.exports.getAccountValue = getAccountValue;
module.exports.postMarketSellOrder = postMarketSellOrder;
module.exports.postMarketBuyOrder = postMarketBuyOrder;
