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
    var total = 0;
    data.result.forEach(coin => {
      total += coin.usdValue;
    })
    data.total = total;
    return data;
  })
  .then(data => {
    var responseObj = {
      accountValue: data.total,
      link: data.result[2].total,
      btc: data.result[0].total
    }
    res.send(responseObj);
  })
  .catch(err => {
    console.log(err);
  })
});

app.post('/tradingview', function (req, res) {
  console.log(req.body);

  getAccountValue()
  .then(data => {
    var event = req.body.event;
    var high = req.body.high;
    var low = req.body.high;
    var pair = req.body.pair;
    var coin = req.body.coin;
    if (event === 'bullish reversal') {
      if (data.result[0].free > 0) {
        cancelAllOrders()
        .then(() => {
          return getMarket('LINK/BTC')
        })
        .then(marketData => {
          console.log('marketData: ', marketData)
          postStopMarketBuyOrder(high, data.result[0].free, marketData.result.price)
          .then(() => {
            console.log('successfully posted stop market buy order');
            return;
          })
          .catch(err => {
            console.log(err);
          })
        })
        .then(() => {
          var candle = {
            pair: pair,
            high: high,
            low: low
          }
          saveCandle(candle);
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        console.log('no btc to trade');
      }
    }
    if (event === 'bearish reversal') {
      if (data.result[2].free > 0) {
        cancelAllOrders()
        .then(() => {
          postStopMarketSellOrder(low, data.result[2].free)
          .then(() => {
            console.log('successfully posted stop market sell order');
            return;
          })
          .catch(err => {
            console.log(err);
          })
        })
        .then(() => {
            var candle = {
              pair: pair,
              high: high,
              low: low
            }
            saveCandle(candle);
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        console.log('no link to trade');
      }
    }
    if (event === 'local top') {
      if (data.result[2].free > 0) {
        cancelAllOrders()
        .then(() => {
          postMarketSellOrder(data.result[2].free)
          .then(() => {
            console.log('successfully posted market sell order');
            return;
          })
          .catch(err => {
            console.log(err);
          })
        })
        .then(() => {
          var candle = {
            pair: pair,
            high: high,
            low: low
          }
          saveCandle(candle);
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        console.log('no link to trade');
      }
    }
  })
  .then(() => {
    res.redirect('/');
  })
});

// DO NOT USE UNTIL CHANGE ORDER CANCELING
app.post('/test', function (req, res) {
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
        console.log('test: canceling order');
        console.log('fetching orderID');
        fetchOrder(pair)
        .then(order => {
          console.log('orderID: ', orderID);
          return cancelOrder(order.orderID);
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
        fetchOrder(pair)
        .then(order => {
          console.log('orderID: ', orderID);
          return cancelOrder(order.orderID);
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
        fetchOrder(pair)
        .then(order => {
          console.log('orderID: ', orderID);
          return cancelOrder(order.orderID);
        })
        .then(() => {
          postMarketSellOrder(freeCoins, pair)
          .then(() => {
            .then(orderRes => {
              console.log('successfully posted market sell order');
              console.log(orderRes);
              var orderID = orderRes.result.id;
              return saveOrder(pair, orderID);
            })
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