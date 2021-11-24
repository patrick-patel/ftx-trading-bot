const axios = require('axios');
const fetchCandle = require('../database/index.js').fetchCandle;
const fetchAllUsers = require('../database/index.js').fetchAllUsers;
const decrypt = require("../server/auth/dataEncryption.js").decrypt;


const { RestClient, WebsocketClient } = require('ftx-api');


// REST CLIENT

// const key = process.env.API_KEY || config.API_KEY;
// const secret = process.env.secret || config.secret;


let establishRESTConnection = ({
  api_key,
  secret,
  isFTXUS,
  subAccountName
}) => {
  let restClientOptions = {};
  if (isFTXUS) {
    restClientOptions = {
      domain: 'ftxus',
      subAccountName: subAccountName
    };
  } else {
    restClientOptions = {
      subAccountName: subAccountName
    };
  }

  var decryptedSecret = decrypt(secret);

  var connection = {
    client: new RestClient(api_key, decryptedSecret, restClientOptions),
    freeBaseScaler: 1 / (5 * 2),
    orderAdj: 0.0010 * Math.random() + 0.0015
  };
  return connection;
}

let getAccountValue = ({ client }) => {
  console.log('retrieving account value from ftx');
  return client.getBalances();
}

// let postMarketSellOrder = (client, size, pair) => {
//   console.log('posting market sell');
//   console.log('size: ', size);
//   return client.placeOrder({
//     'market': pair,
//     'side': 'sell',
//     'price': null,
//     'type': 'market',
//     'size': size,
//   });
// }

let postStopMarketBuyOrder = (client, triggerPrice, freeBase, currentPrice, pair, orderAdj, freeBaseScaler) => {
  console.log('posting stop market buy order for pair: ', pair);
  triggerPrice = parseFloat(triggerPrice);
  triggerPrice = triggerPrice * (1 + orderAdj);
  size = freeBase / currentPrice * freeBaseScaler;
  console.log('freeBase: ', freeBase);
  console.log('currentPrice: ', currentPrice);
  console.log('connection.freeBaseScaler: ', freeBaseScaler);
  console.log('size: ', size);
  return client.placeTriggerOrder({
    'market': pair,
    'side': 'buy',
    'triggerPrice': triggerPrice,
    'size': size,
    'type': 'stop'
  });
}

let postStopMarketSellOrder = (client, triggerPrice, size, pair, orderAdj) => {
  console.log('posting stop market sell order for pair: ', pair);
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
  console.log('get market data for market: ', market);
  return client.getMarket(market);
}

let getOpenTriggerOrders = (client, market) => {
  console.log('getting trigger orders for market: ', market);
  return client.getOpenTriggerOrders(market);
}

// WEBSOCKET CLIENT

let establishWSConnection = (credential) => {
  console.log('establishing connection for: ', credential.api_key);
  var decryptedSecret = decrypt(credential.secret);
  let params = {};
  if (credential.isFTXUS) {
    params = {
      key: credential.api_key,
      secret: decryptedSecret,
      domain:'ftxus',
      subAccountName: credential.subAccountName
    }
  } else {
    params = {
      key: credential.api_key,
      secret: decryptedSecret,
      subAccountName: credential.subAccountName
    }
  }

  const ws = new WebsocketClient(params);

  ws.on('response', msg => {
    console.log('response: ', msg);
    console.log('credential: ', credential.api_key);
  });
  ws.on('update', msg => {
    console.log('update: ', msg);
    console.log('credential: ', credential.api_key);
    if (msg.data) {
      var side = msg.data.side;
      var pair = msg.data.market;
      var pairSplit = pair.split('/');
      var base = pairSplit[1];
      var coin = pairSplit[0];
      console.log('base: ', base);
      console.log('coin: ', coin);

      var connection = establishRESTConnection(credential);
      if (connection) {
        var hr = "off";
        var hrs = credential.isSubscribedTo[pair];
        if (hrs) {
          if (hrs["1hr"] === true) { hr = "1hr" };
          if (hrs["2hr"] === true) { hr = "2hr" };
          if (hrs["4hr"] === true) { hr = "4hr" };
          if (hrs["6hr"] === true) { hr = "6hr" };
          if (hrs["12hr"] === true) { hr = "12hr" };
          console.log('ws hr passed to fetchcandle: ', hr);
          fetchCandle(pair, hr)
          .then(candle => {
            console.log('candle: ', candle);
            var low = candle[0].low;
            var high = candle[0].high
            getAccountValue(connection)
            .then(wallet => {
              // console.log('wallet: ', wallet);
              var walletEntity = wallet.result.find(walletEntity => walletEntity.coin === coin);
              var baseWalletEntity = wallet.result.find(baseWalletEntity => baseWalletEntity.coin === base);

              if (walletEntity) {
                var freeCoins = walletEntity.free;
                console.log('walletEntity: ', walletEntity.coin);
                console.log('walletEntity freeCoins: ', freeCoins);
              } else {
                var freeCoins = 0;
              }
              if (baseWalletEntity) {
                var freeBase = baseWalletEntity.free;
                console.log('baseWalletEntity: ', baseWalletEntity.coin);
                console.log('baseWalletEntity freeBase: ', freeBase);
              } else {
                var freeBase = 0;
              }

              var getOpenTriggerOrdersParams = {
                market: pair,
                type: 'stop'
              };
              console.log('fetching orders');
              getOpenTriggerOrders(connection.client, getOpenTriggerOrdersParams)
              .then(orders => {
                console.log('orders: ', orders);
                if (orders.result[0]) {
                  console.log('canceling order');
                  var openTriggerOrderPromises = [];
                  orders.result.forEach(order => {
                    openTriggerOrderPromises.push(cancelOrder(connection.client, order.id));
                  })
                  Promise.all(openTriggerOrderPromises)
                  .catch(err => console.log('cancel orders err message: ', err.message))
                }
              })
              .catch(err => console.log(err))
              .then(() => {
                if (side === 'buy') {
                  if (freeCoins > 0) {
                    postStopMarketSellOrder(connection.client, low, freeCoins, pair, connection.orderAdj)
                    .then(() => {
                      console.log('successfully posted stop market sell order');
                    })
                    .catch(err => console.log(err))
                  } else { console.log('no free coins') }
                }
                if (side === 'sell') {
                  console.log('fetching orderID');
                  var getOpenTriggerOrdersParams = {
                    market: pair,
                    type: 'stop'
                  };
                  getMarket(connection.client, pair)
                  .then(marketData => {
                    console.log('marketData: ', marketData)
                    var currentPrice = marketData.result.price;
                    postStopMarketBuyOrder(connection.client, high, freeBase, currentPrice, pair, connection.orderAdj, connection.freeBaseScaler)
                    .then(() => {
                      console.log('successfully posted stop market buy order');
                    })
                    .catch(err => console.log(err))
                  })
                  .catch(err => console.log(err))
                }
              })
              .catch(err => console.log(err))
            })
          })
        } else {
          console.log('hrs not defined: ', hrs);
        }
      } else {
        console.log('connection unsuccessful, api key may no longer exist')
      }
    }
  });

  ws.on('error', msg => console.log('err: ', msg));

  ws.subscribe({
    channel: 'fills',
  })
}


module.exports.establishRESTConnection = establishRESTConnection;
module.exports.establishWSConnection = establishWSConnection;
module.exports.getAccountValue = getAccountValue;
// module.exports.postMarketSellOrder = postMarketSellOrder;
module.exports.postStopMarketBuyOrder = postStopMarketBuyOrder;
module.exports.postStopMarketSellOrder = postStopMarketSellOrder;
module.exports.cancelAllOrders = cancelAllOrders;
module.exports.cancelOrder = cancelOrder;
module.exports.getMarket = getMarket;
module.exports.getOpenTriggerOrders = getOpenTriggerOrders;
