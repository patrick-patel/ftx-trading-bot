const axios = require('axios');
const fetchCandle = require('../database/index.js').fetchCandle;

// const config = require('../config.js');

const { RestClient, WebsocketClient } = require('ftx-api');

// REST CLIENT

const key = process.env.API_KEY || config.API_KEY;
const secret = process.env.secret || config.secret;

const restClientOptions = {
  domain: 'ftxus',
  subAccountName: 'sub1'
};

const client = new RestClient(key, secret, restClientOptions);

const buySideAdj = 0.0000025;
const sellSideAdj = 0.0000005;

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
  triggerPrice += buySideAdj;
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
  triggerPrice -= sellSideAdj;
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

// WEBSOCKET CLIENT

let params = {
  key: key,
  secret: secret,
  domain: 'ftxus',
  subAccountName: 'sub1'
}

const ws = new WebsocketClient(params);

ws.on('response', msg => console.log('response: ', msg));
ws.on('update', msg => {
  console.log('update: ', msg);
  if (msg.data) {
    var side = msg.data.side;
    var size = msg.data.size;
    console.log('size: ', size);
    fetchCandle()
    .then(data => {
      console.log('type of data: ', typeof data);
      console.log('data: ', data);
      var candle = JSON.parse(data[0]);
      return candle;
    })
    .then(candle => {
      console.log('candle: ', candle);
      if (side === 'buy') {
        var triggerPrice = candle.low - sellSideAdj;
        console.log('triggerPrice: ', triggerPrice);
        client.placeTriggerOrder({
          'market': 'LINK/BTC',
          'side': 'sell',
          'triggerPrice': triggerPrice,
          'size': size,
          'type': 'stop'
        })
        .then(() => {
          console.log('successfully posted a safety sell stop')
        })
        .catch(err => {
          console.log(err);
        })
      }
      if (side === 'sell') {
        var triggerPrice = candle.high + buySideAdj;
        var size = msg.data.size / candle.high * 0.9;
        client.placeTriggerOrder({
          'market': 'LINK/BTC',
          'side': 'buy',
          'triggerPrice': triggerPrice,
          'size': size,
          'type': 'stop'
        })
        .then(() => {
          console.log('successfully posted a safety buy stop')
        })
        .catch(err => {
          console.log(err);
        })
      }
    })
  }

});
ws.on('error', msg => console.log('err: ', msg));

ws.subscribe({
  channel: 'fills',
  market: 'LINK/BTC'
})

module.exports.getAccountValue = getAccountValue;
module.exports.postMarketSellOrder = postMarketSellOrder;
module.exports.postStopMarketBuyOrder = postStopMarketBuyOrder;
module.exports.postStopMarketSellOrder = postStopMarketSellOrder;
module.exports.cancelAllOrders = cancelAllOrders;
module.exports.getMarket = getMarket;