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
// const save = require('../database/index.js').save;
// const fetchTop25 = require('../database/index.js').fetchTop25;

app.use(bodyParser.json());
app.use(express.text());
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
  var string = JSON.stringify(req.body);
  console.log('json: ', json);
  var json = JSON.parse(string);
  console.log(typeof json);
  console.log(json);


  getAccountValue()
  .then(data => {
    if (json.event === 'event') {
      console.log('it can be manipulated!');
    }
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


let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});