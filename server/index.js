const express = require('express');
let app = express();
var bodyParser = require('body-parser');
if (!process.env.API_KEY) {
  const config = require('../config.js');
}

// auth
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("./auth/register");
const validateLoginInput = require("./auth/login");
const validateAPIInput = require("./auth/api");
const verifyJWT = require("./auth/verifyJWT");
const secretOrKey = process.env.secretOrKey || config.secretOrKeys;

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
const fetchUserByID = require('../database/index.js').fetchUserByID;
const updateUserByID = require('../database/index.js').updateUserByID;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', express.static(__dirname + '/../client/dist'));

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

app.get('/userData', verifyJWT, (req, res) => {
  console.log('inside userData route');
  console.log('req.user.id: ', req.user.id);
  if (req.user.id) {
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
    // res.send({ isLoggedIn: true});
  }
})

app.get('/userAPI', verifyJWT, (req, res) => {
  console.log('inside userAPI route');
  if (req.user.id) {
    fetchUserByID(req.user.id)
    .then(user => {
      console.log('user: ', user);
      if (user.api_key) {
        res.send(user.api_key);
      } else {
        res.status(400);
      }
    })
  }
})

app.get('*', (req, res) => {
  res.redirect('/');
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
    var btcWalletEntity = wallet.result.find(btcWalletEntity => btcWalletEntity.coin === "BTC");
    if (walletEntity) {
      var freeCoins = walletEntity.free;
      console.log('walletEntity: ', walletEntity)
    } else {
      var freeCoins = 0;
    }
    if (btcWalletEntity) {
      var freeBTC = btcWalletEntity.free;
      console.log('btcWalletEntity: ', btcWalletEntity)
    } else {
      var freeBTC = 0;
    }
    if (event === 'bullish reversal' && freeBTC > 0) {
      console.log('fetching orderID');
      getOpenTriggerOrders({market: req.body.pair, type: 'stop'})
      .then(orders => {
        console.log('order: ', orders);
        if (orders.result[0].id) {
          console.log('canceling order');
          var promises = [];
          orders.result.forEach(order => {
            promises.push(cancelOrder(order.id));
          })
          return Promise.all(promises);
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
        postStopMarketBuyOrder(high, freeBTC, currentPrice, pair)
        .then(() => {
          console.log('successfully posted stop market buy order');
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
    if (event === 'bearish reversal' && freeCoins > 0) {
      getOpenTriggerOrders({market: req.body.pair, type: 'stop'})
      .then(orders => {
        console.log('order: ', orders);
        if (orders.result[0].id) {
          console.log('canceling order');
          var promises = [];
          orders.result.forEach(order => {
            promises.push(cancelOrder(order.id));
          })
          return Promise.all(promises);
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
    if (event === 'bearish reversal' && freeBTC > 0) {
      console.log('fetching orderID');
      getOpenTriggerOrders({market: req.body.pair, type: 'stop'})
      .then(orders => {
        console.log('order: ', orders);
        if (orders.result[0].id) {
          console.log('canceling order');
          var promises = [];
          orders.result.forEach(order => {
            promises.push(cancelOrder(order.id));
          })
          return Promise.all(promises);
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
        postStopMarketBuyOrder(high, freeBTC, currentPrice, pair)
        .then(() => {
          console.log('successfully posted stop market buy order');
        })
      })
      .catch(err => {
        console.log(err);
      })
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

app.post('/register', (req, res) => {
  // Form validation
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  fetchUser(email)
  .then(user => {
    console.log('user: ', user);
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      console.log('user not found, creating account')
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          console.log('hashedPassword: ', hashedPassword);
          saveUser(email, hashedPassword);
        });
      });
    }
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    res.redirect('/');
  })
});

app.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  console.log('req.body: ', req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  fetchUser(email)
  .then(user => {
    // Check if user exists
    if (!user.email) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    console.log('user: ', user);
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        console.log('isMatch');
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
        };
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: 2419200 // 4 weeks in seconds
          },
          (err, token) => {
            console.log('token: ', token);
            res.json({ success: true, token: "Bearer " + token}).redirect('/');
          }
        );
      } else {
        console.log('isNotMatch');
        res.status(400).json({ passwordincorrect: "Password incorrect" }).redirect('/');
      }
    });
  })
  .catch(err => {
    console.log(err);
  })
});

app.post('/postAPI', verifyJWT, (req, res) => {
  // Form validation
  console.log(req.body);
  const { errors, isValid } = validateAPIInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const api_key = req.body.api_key;
  const secret = req.body.secret;
  fetchUserByID(req.user.id)
  .then(user => {
    console.log('user: ', user);
    user.api_key = api_key;
    user.secret = secret;
    updateUserByID(user)
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    console.log('successfully updated user!');
    res.end();
  })
});


let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
