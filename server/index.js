const express = require('express');
let app = express();
var bodyParser = require('body-parser');

// auth
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("./auth/register");
const validateLoginInput = require("./auth/login");
const passport = require("passport");
require("./auth/passport")(passport);

// ftx requests
const getAccountValue = require('../lib/ftx.js').getAccountValue;
const postMarketSellOrder = require('../lib/ftx.js').postMarketSellOrder;
const postStopMarketBuyOrder = require('../lib/ftx.js').postStopMarketBuyOrder;
const postStopMarketSellOrder = require('../lib/ftx.js').postStopMarketSellOrder;
const cancelAllOrders = require('../lib/ftx.js').cancelAllOrders;
const cancelOrder = require('../lib/ftx.js').cancelOrder;
const getMarket = require('../lib/ftx.js').getMarket;
const getOpenTriggerOrders = require('../lib/ftx.js').getOpenTriggerOrders;

// database calls
const saveCandle = require('../database/index.js').saveCandle;
const fetchCandle = require('../database/index.js').fetchCandle;
const saveUser = require('../database/index.js').saveUser;
const fetchUser = require('../database/index.js').fetchUser;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', express.static(__dirname + '/../client/dist'));
app.use(passport.initialize());

// get requests
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
  .then(responseObj => {
    res.send(responseObj);
  })
  .catch(err => {
    console.log(err);
  })
});

app.get('*', (req,res) =>{
  express.static(__dirname + '/../client/dist');
});

// post requests
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
          .then(() => {
            console.log('successfully posted stop market buy order');
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
      if (event === 'bearish reversal') {
        console.log('test: canceling order');
        console.log('fetching orderID');
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
          .then(() => {
            console.log('successfully posted stop market sell order');
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
      if (event === 'local top') {
        console.log('test: canceling order');
        console.log('fetching orderID');
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
          .then(() => {
            console.log('successfully posted market sell order');
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

app.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  fetchUser(email)
  .then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          saveUser(email, hashedPassword)
        });
      });
    }
  });
});

app.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  fetchUser(email)
  .then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 2419200 // 4 weeks in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
