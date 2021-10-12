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
const save = require('../database/index.js').save;
const fetchCandle = require('../database/index.js').fetchCandle;

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
    if (req.body.event === 'bullish reversal') {
      if (data.result[0].free > 0) {
        cancelAllOrders()
        .then(() => {
          return getMarket('LINK/BTC')
        })
        .then(marketData => {
          console.log('marketData: ', marketData)
          postStopMarketBuyOrder(req.body.high, data.result[0].free, marketData.result.price)
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
            high: req.body.high,
            low: req.body.low
          }
          save(candle);
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        console.log('no btc to trade');
      }
    }
    if (req.body.event === 'bearish reversal') {
      if (data.result[2].free > 0) {
        cancelAllOrders()
        .then(() => {
          postStopMarketSellOrder(req.body.low, data.result[2].free)
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
              high: req.body.high,
              low: req.body.low
            }
            save(candle);
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        console.log('no link to trade');
      }
    }
    if (req.body.event === 'local top') {
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
            high: req.body.high,
            low: req.body.low
          }
          save(candle);
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

app.post('/test', function (req, res) {
  console.log(req.body);
  var high = req.body.high;
  var coin = req.body.coin;
  var pair = req.body.pair;
  getAccountValue()
  .then(wallet => {
    console.log('wallet: ', wallet);
    if (req.body.event === 'bullish reversal') {
      console.log(wallet);
      var walletEntity = wallet.result.find(walletEntity => walletEntity.coin === 'BTC'); // coin for others
      if (walletEntity.free > 0) {
        console.log('test: canceled orders');
        // cancelAllOrders() // need to change to specific order
        // .then(() => {
          // return getMarket(pair);
          // })
        getMarket(pair)
        .then(marketData => {
          console.log('marketData: ', marketData)
          var currentPrice = marketData.result.price;
          console.log('test: posting stop market buy order')
          // postStopMarketBuyOrder(high, walletEntity.free, currentPrice)
          .then(() => {
            console.log('successfully posted stop market buy order');
            return;
          })
          .catch(err => {
            console.log(err);
          })
        })
        // .then(() => {
        //   var candle = {
        //     high: req.body.high,
        //     low: req.body.low
        //   }
        //   save(candle);
        // })
        .catch(err => {
          console.log(err);
        })
      } else {
        console.log('no btc to trade');
      }
    }
  })

  .then(() => {
    res.redirect('/');
  })
});



let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});