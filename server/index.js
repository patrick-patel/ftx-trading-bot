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
  getAccountValue('sub1')
  .then((data) => {
    console.log(data)
    res.send({ accountValue: data.accountValue });
  })
});

app.post('/', function (req, res) {
  getAccountValue(req.body.user)
  .then(repos => {
    return save(repos.data);
  })
  .then(() => {
    res.redirect('/repos');
  })
});


let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});