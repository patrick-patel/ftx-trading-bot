const axios = require('axios');
const config = require('../config.js');

const { RestClient } = require('ftx-api');

const key = process.env.API_KEY || config.API_KEY;
const secret = process.env.secret || config.secret;

const restClientOptions = {
  domain: 'ftxus',
  subAccountName: 'sub1'
};

const client = new RestClient(key, secret, restClientOptions);

const adjPrice = 0.0000025;

let getAccountValue = () => {
  console.log('retrieving account value from ftx');
  return client.getBalances();
}

let postMarketSellOrder = (size) => {
  console.log('posting market sell');
  console.log('size: ', size);
  return client.placeOrder({
    'market': 'LINK/BTC',
    'side': 'sell',
    'price': null,
    'type': 'market',
    'size': size,
  });
}

let postStopMarketBuyOrder = (triggerPrice, size, currentPrice) => {
  console.log('posting stop market buy order');
  triggerPrice = parseFloat(triggerPrice);
  triggerPrice += adjPrice;
  size = size / currentPrice * 0.9;
  console.log('size: ', size);
  return client.placeTriggerOrder({
    'market': 'LINK/BTC',
    'side': 'buy',
    'triggerPrice': triggerPrice,
    'size': size,
    'type': 'stop'
  });
}

let postStopMarketSellOrder = (triggerPrice, size) => {
  console.log('posting stop market sell order');
  console.log('size: ', size);
  triggerPrice = parseFloat(triggerPrice);
  triggerPrice -= adjPrice;
  return client.placeTriggerOrder({
    'market': 'LINK/BTC',
    'side': 'sell',
    'triggerPrice': triggerPrice,
    'size': size,
    'type': 'stop'
  });
}

let cancelAllOrders = () => {
  console.log('canceling orders');
  return client.cancelAllOrders({})
}

let getMarket = (market) => {
  console.log('get market data');
  return client.getMarket(market)
}

// let getCandle = () => {
//   console.log('retrieving last candle info');
//   var end_time = new Date().getTime();
//   end_time = end_time / 1000;
//   var start_time = end_time - 3600; // change to 3600

//   return client.getHistoricalPrices({
//     'market_name': 'LINK/BTC',
//     'resolution': 3600, // change to 3600
//     'start_time': start_time,
//     'end_time': end_time
//   })
// }

module.exports.getAccountValue = getAccountValue;
module.exports.postMarketSellOrder = postMarketSellOrder;
module.exports.postStopMarketBuyOrder = postStopMarketBuyOrder;
module.exports.postStopMarketSellOrder = postStopMarketSellOrder;
module.exports.cancelAllOrders = cancelAllOrders;
module.exports.getMarket = getMarket;



// module.exports.getCandle = getCandle;

