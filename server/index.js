const express = require('express');
var bodyParser = require('body-parser');

// ftx requests
const getAccountValue = require('../lib/ftx.js').getAccountValue;
const postMarketSellOrder = require('../lib/ftx.js').postMarketSellOrder;
const postMarketBuyOrder = require('../lib/ftx.js').postMarketBuyOrder;

// database calls
const save = require('../database/index.js').save;
const fetchTop25 = require('../database/index.js').fetchTop25;
let app = express();

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
    return total;
  })
  .then(accountValue => {
    var responseObj = {
      accountValue: accountValue
    }
    res.send(responseObj);
  })
  .catch(err => {
    console.log(err);
  })
});

app.post('/tradingview', function (req, res) {
  setTimeout(getNextCandle, 5000) // change to 3600000
  .then(data => {
    console.log(data)
  })
  .then(() => {
    res.redirect('/');
  })
});


let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});