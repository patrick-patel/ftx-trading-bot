const axios = require('axios');
const fetchCandle = require('../database/index.js').fetchCandle;

const { RestClient, WebsocketClient } = require('ftx-api');


// REST CLIENT

const key = process.env.API_KEY || config.API_KEY;
const secret = process.env.secret || config.secret;


let establishRESTConnection = ({
  api_key,
  secret,
  isFTXUS,
  subAccountName,
  numActivePairs
}) => {

  if (isFTXUS) {
    const domain = 'ftxus';
  }
  const restClientOptions = {
    domain: domain || null,
    subAccountName: subAccountName
  };

  var connection = {
    client: new RestClient(key, secret, restClientOptions),
    freeBTCScaler: 1 / numActivePairs,
    orderAdj: 0.005 * Math.random()
  };
  return connection;
}

let getAccountValue = ({ client }) => {
  console.log('retrieving account value from ftx');
  return client.getBalances();
}

let postMarketSellOrder = (client, size, pair) => {
  console.log('posting market sell');
  console.log('size: ', size);
  return client.placeOrder({
    'market': pair,
    'side': 'sell',
    'price': null,
    'type': 'market',
    'size': size,
  });
}

let postStopMarketBuyOrder = (client, triggerPrice, size, currentPrice, pair) => {
  console.log('posting stop market buy order');
  triggerPrice = parseFloat(triggerPrice);
  triggerPrice = triggerPrice * (1 + orderAdj);
  size = size / currentPrice * freeBTCScaler;
  console.log('size: ', size);
  return client.placeTriggerOrder({
    'market': pair,
    'side': 'buy',
    'triggerPrice': triggerPrice,
    'size': size,
    'type': 'stop'
  });
}

let postStopMarketSellOrder = (client, triggerPrice, size, pair) => {
  console.log('posting stop market sell order');
  console.log('size: ', size);
  triggerPrice = parseFloat(triggerPrice);
  triggerPrice = triggerPrice * (1 - orderAdj);
  return client.placeTriggerOrder({
    'market': pair,
    'side': 'sell',
    'triggerPrice': triggerPrice,
    'size': size,
    'type': 'stop'
  });
}

let cancelAllOrders = () => {
  console.log('canceling all orders');
  return client.cancelAllOrders({});
}

let cancelOrder = (client, orderID) => {
  console.log(`canceling order ${orderID}`);
  return client.cancelOpenTriggerOrder(orderID);
}

let getMarket = (client, market) => {
  console.log('get market data');
  return client.getMarket(market);
}

let getOpenTriggerOrders = (client, market) => {
  console.log('getting trigger orders');
  return client.getOpenTriggerOrders(market);
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
    var pair = msg.data.market;
    fetchCandle(pair)
    .then(candle => {
      console.log('candle: ', candle);
      if (side === 'buy') {
        var triggerPrice = candle[0].low * (1 - orderAdj);
        var size = msg.data.size;
        client.placeTriggerOrder({
          'market': pair,
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
        var triggerPrice = candle[0].high * (1 + orderAdj);
        var size = msg.data.size * 0.85;
        client.placeTriggerOrder({
          'market': pair,
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
})

module.exports.establishRESTConnection = establishRESTConnection;
module.exports.getAccountValue = getAccountValue;
module.exports.postMarketSellOrder = postMarketSellOrder;
module.exports.postStopMarketBuyOrder = postStopMarketBuyOrder;
module.exports.postStopMarketSellOrder = postStopMarketSellOrder;
module.exports.cancelAllOrders = cancelAllOrders;
module.exports.cancelOrder = cancelOrder;
module.exports.getMarket = getMarket;
module.exports.getOpenTriggerOrders = getOpenTriggerOrders;
