const express = require('express');
let app = express();
var bodyParser = require('body-parser');

// ftx requests
const getAccountValue = require('../lib/ftx.js').getAccountValue;
const postMarketSellOrder = require('../lib/ftx.js').postMarketSellOrder;
const postStopMarketBuyOrder = require('../lib/ftx.js').postStopMarketBuyOrder;
const postStopMarketSellOrder = require('../lib/ftx.js').postStopMarketSellOrder;
const cancelAllOrders = require('../lib/ftx.js').cancelAllOrders;
const getMarket = require('../lib/ftx.js').getMarket;
const getOpenTriggerOrders = require('../lib/ftx.js').getOpenTriggerOrders;

// database calls
const saveCandle = require('../database/index.js').saveCandle;
const fetchCandle = require('../database/index.js').fetchCandle;
const saveOrder = require('../database/index.js').saveOrder;
const fetchOrder = require('../database/index.js').fetchOrder;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', express.static(__dirname + '/../client/dist'));

app.get('/accountValue', function (req, res) {
  console.log('----------------get request-----------------');
  getAccountValue()
  .then(data => {
    console.log(data)
    responseObj = {total: 0};
    data.result.forEach(walletEntity => {
      responseObj.total += walletEntity.usdValue;
      responseObj[walletEntity.coin] = walletEntity.total;
    })
    return responseObj;
  })
  .then(() => {
    getOpenTriggerOrders("MATIC/BTC");
  })
  .then(order => {
    console.log('order: ', order);
    fetchCandle("MATIC/BTC");
  })
  .then(candle => {
    console.log('candle: ', candle);
  })
  .then(responseObj => {
    res.send(responseObj);
  })
  .catch(err => {
    console.log(err);
  })
});

app.post('/tradingview', function (req, res) {
  console.log(req.body);
  var high = req.body.high;
  var low = req.body.low
  var event = req.body.event;
  var coin = req.body.coin;
  var pair = req.body.pair;
  getAccountValue()
  .then(wallet => {
    console.log('wallet: ', wallet);
    var walletEntity = wallet.result.find(walletEntity => walletEntity.coin === coin);
    var freeCoins = walletEntity.free;
    console.log('walletEntity: ', walletEntity)
    if (freeCoins > 0) {
      if (event === 'bullish reversal') {
        console.log('fetching orderID');
        // fetchOrder(req.body.pair)
        getOpenTriggerOrders({market: req.body.pair, type: 'stop'})
        .then(order => {
          console.log('order: ', order);
          if (order.result[0].id) {
            console.log('canceling order');
            return cancelOrder(order.result[0].id);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          return getMarket(pair);
        })
        .then(marketData => {
          console.log('marketData: ', marketData)
          var currentPrice = marketData.result.price;
          console.log('test: posting stop market buy order')
          postStopMarketBuyOrder(high, freeCoins, currentPrice, pair)
          .then(orderRes => {
            console.log('successfully posted stop market buy order');
            console.log(orderRes);
            var orderID = orderRes.result.id;
            return saveOrder(pair, orderID);
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
      if (event === 'bearish reversal') {
        console.log('test: canceling order');
        console.log('fetching orderID');
        // fetchOrder(req.body.pair)
        getOpenTriggerOrders({market: req.body.pair, type: 'stop'})
        .then(order => {
          console.log('order: ', order);
          if (order.result[0].id) {
            console.log('canceling order');
            return cancelOrder(order.result[0].id);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          postStopMarketSellOrder(low, freeCoins, pair)
          .then(orderRes => {
            console.log('successfully posted stop market sell order');
            console.log(orderRes);
            var orderID = orderRes.result.id;
            return saveOrder(pair, orderID);
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
      if (event === 'local top') {
        console.log('test: canceling order');
        console.log('fetching orderID');
        // fetchOrder(req.body.pair)
        getOpenTriggerOrders({market: req.body.pair, type: 'stop'})
        .then(order => {
          console.log('order: ', order);
          if (order.result[0].id) {
            console.log('canceling order');
            return cancelOrder(order.result[0].id);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          postMarketSellOrder(freeCoins, pair)
          .then(orderRes => {
            console.log('successfully posted market sell order');
            console.log(orderRes);
            var orderID = orderRes.result.id;
            return saveOrder(pair, orderID);
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  })
  .then(() => {
      var candle = {
        pair: pair,
        high: high,
        low: low
      }
      saveCandle(candle);
  })
  .then(() => {
    res.redirect('/');
  })
});



let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
