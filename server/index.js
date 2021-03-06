const express = require('express');
let app = express();
var bodyParser = require('body-parser');
const chartSnap = require('../lib/chartSnap.js')
/* --------REMOVE-------*/
// const config = require('../config.js');

// auth
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("./auth/register");
const validateLoginInput = require("./auth/login");
const validateAPIInput = require("./auth/api");
const verifyJWT = require("./auth/verifyJWT");
const encrypt = require("./auth/dataEncryption.js").encrypt;
const secretOrKey = process.env.secretOrKey || config.secretOrKeys;
const WebHookPasskey = process.env.WebHookPasskey;

// ftx requests
const establishRESTConnection = require('../lib/ftx.js').establishRESTConnection;
const establishWSConnection = require('../lib/ftx.js').establishWSConnection;
const getAccountValue = require('../lib/ftx.js').getAccountValue;
// const postMarketSellOrder = require('../lib/ftx.js').postMarketSellOrder;
const postStopMarketBuyOrder = require('../lib/ftx.js').postStopMarketBuyOrder;
const postStopMarketSellOrder = require('../lib/ftx.js').postStopMarketSellOrder;
const cancelAllOrders = require('../lib/ftx.js').cancelAllOrders;
const cancelOrder = require('../lib/ftx.js').cancelOrder;
const getMarket = require('../lib/ftx.js').getMarket;
const getOpenTriggerOrders = require('../lib/ftx.js').getOpenTriggerOrders;

const sendEmail = require('../lib/sendEmail.js').sendEmail;

// database calls
const saveCandle = require('../database/index.js').saveCandle;
const fetchCandle = require('../database/index.js').fetchCandle;
const deleteCandle = require('../database/index.js').deleteCandle;
const saveUser = require('../database/index.js').saveUser;
const fetchAllUsers = require('../database/index.js').fetchAllUsers;
const fetchUser = require('../database/index.js').fetchUser;
const fetchUserByID = require('../database/index.js').fetchUserByID;
const updateUserByID = require('../database/index.js').updateUserByID;
const saveToken = require('../database/index.js').saveToken;
const fetchToken = require('../database/index.js').fetchToken;
const deleteToken = require('../database/index.js').deleteToken;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', express.static(__dirname + '/../client/dist'));

// get requests
app.get('/userData', verifyJWT, (req, res) => {
  console.log('inside userData route');
  // console.log('req.user.id: ', req.user.id);
  if (req.user.id) {
    var responseArray = [];
    var promises = [];
    fetchUserByID(req.user.id)
    .then(user => {
      user.credentials.forEach(credential => {
        var connection = establishRESTConnection(credential);
        promises.push(getAccountValue(connection)
        .then(data => {
          // console.log(data)
          responseObj = {total: 0};
          data.result.forEach(walletEntity => {
            responseObj.total += walletEntity.usdValue;
            responseObj[walletEntity.coin] = walletEntity.total;
          })
          responseObj.api_key = credential.api_key;
          responseObj.subAccountName = credential.subAccountName;
          responseObj.isSubscribedTo = credential.isSubscribedTo;
          responseObj.chartData = credential.chartData;
          responseArray.push(responseObj);
        })
        .catch(err => {
          console.log(err);
        }))
      })
      Promise.all(promises)
      .then(() => {
        // console.log('response array: ', responseArray);
        res.send(responseArray);
      })
    })
  }
})

app.get('/userAPI', verifyJWT, (req, res) => {
  console.log('inside userAPI route');
  if (req.user.id) {
    fetchUserByID(req.user.id)
    .then(user => {
      // console.log('user: ', user);
      if (user.credentials[0].api_key) {
        var subAccounts = [];
        user.credentials.forEach(credential => {
          var entity = [credential.api_key, credential.subAccountName];
          subAccounts.push(entity);
        })
        res.send(subAccounts);
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
  if (req.body.passkey === WebHookPasskey) {
    var high = req.body.high;
    var low = req.body.low
    var event = req.body.event;
    var pair = req.body.pair;
    var hr = req.body.hr;
    var pairSplit = pair.split('/');
    var base = pairSplit[1];
    var coin = pairSplit[0];
    console.log('base: ', base);
    console.log('coin: ', coin);

    fetchAllUsers()
    .then(users => {
      console.log(users);
      var promises = [];
      users.forEach(user => {
        user.credentials.forEach(credential => {
          if (credential.isSubscribedTo[pair][hr]) {
            const connection = establishRESTConnection(credential);
            promises.push(getAccountValue(connection)
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

              if (event === 'bullish reversal' && freeBase > 0) {
                console.log('fetching orderID');
                var getOpenTriggerOrdersParams = {
                  market: req.body.pair,
                  type: 'stop'
                };
                getOpenTriggerOrders(connection.client, getOpenTriggerOrdersParams)
                .then(orders => {
                  console.log('order: ', orders);
                  if (orders.result[0]) {
                    console.log('canceling order');
                    var openTriggerOrderPromises = [];
                    orders.result.forEach(order => {
                      openTriggerOrderPromises.push(cancelOrder(connection.client, order.id));
                    })
                    Promise.all(openTriggerOrderPromises)
                    .then(() => {
                      getMarket(connection.client, pair)
                      .then(marketData => {
                        console.log('marketData: ', marketData)
                        var currentPrice = marketData.result.price;
                        console.log('posting stop market buy order')
                        postStopMarketBuyOrder(connection.client, high, freeBase, currentPrice, pair, connection.orderAdj, connection.freeBaseScaler)
                        .then(() => {
                          console.log('successfully posted stop market buy order');
                          if (freeCoins > 0) {
                            postStopMarketSellOrder(connection.client, low, freeCoins, pair, connection.orderAdj)
                            .then(() => {
                              console.log('successfully posted stop market sell order');
                            })
                            .catch(err => console.log(err))
                          }
                        })
                        .catch(err => console.log(err))
                      })
                      .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                  } else {
                    getMarket(connection.client, pair)
                    .then(marketData => {
                      console.log('marketData: ', marketData)
                      var currentPrice = marketData.result.price;
                      console.log('posting stop market buy order')
                      postStopMarketBuyOrder(connection.client, high, freeBase, currentPrice, pair, connection.orderAdj, connection.freeBaseScaler)
                      .then(() => {
                        console.log('successfully posted stop market buy order');
                        if (freeCoins > 0) {
                          postStopMarketSellOrder(connection.client, low, freeCoins, pair, connection.orderAdj)
                          .then(() => {
                            console.log('successfully posted stop market sell order');
                          })
                          .catch(err => console.log(err))
                        }
                      })
                      .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                  }
                })
                .catch(err => console.log(err))
              }
              if (event === 'bearish reversal') {
                console.log('fetching orderID');
                var getOpenTriggerOrdersParams = {
                  market: req.body.pair,
                  type: 'stop'
                };
                getOpenTriggerOrders(connection.client, getOpenTriggerOrdersParams)
                .then(orders => {
                  console.log('order: ', orders);
                  if (orders.result[0]) {
                    console.log('canceling order');
                    var openTriggerOrderPromises = [];
                    orders.result.forEach(order => {
                      openTriggerOrderPromises.push(cancelOrder(connection.client, order.id));
                    })
                    Promise.all(openTriggerOrderPromises)
                    .then(() => {
                      if (freeCoins > 0) {
                        postStopMarketSellOrder(connection.client, low, freeCoins, pair, connection.orderAdj)
                        .then(() => {
                          console.log('successfully posted stop market sell order');
                        })
                        .catch(err => console.log(err))
                      } else { console.log('no free coins') }
                    })
                    .catch(err => console.log(err))
                    .then(() => {
                      if (freeBase > 0) {
                        getMarket(connection.client, pair)
                        .then(marketData => {
                          console.log('marketData: ', marketData)
                          var currentPrice = marketData.result.price;
                          console.log('test: posting stop market buy order')
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
                  } else {
                    if (freeCoins > 0) {
                      postStopMarketSellOrder(connection.client, low, freeCoins, pair, connection.orderAdj)
                      .then(() => {
                        console.log('successfully posted stop market sell order');
                      })
                      .catch(err => console.log(err))
                    } else { console.log('no free coins') }
                    if (freeBase > 0) {
                      getMarket(connection.client, pair)
                      .then(marketData => {
                        console.log('marketData: ', marketData)
                        var currentPrice = marketData.result.price;
                        console.log('test: posting stop market buy order')
                        postStopMarketBuyOrder(connection.client, high, freeBase, currentPrice, pair, connection.orderAdj, connection.freeBaseScaler)
                        .then(() => {
                          console.log('successfully posted stop market buy order');
                        })
                        .catch(err => console.log(err))
                      })
                      .catch(err => console.log(err))
                    }
                  }
                })
                .catch(err => console.log(err))
              }
            })
            .catch(err => console.log(err)))
          }
        })
      })
      return Promise.all(promises);
    })
    .then(() => {
      deleteCandle(pair, hr)
      .then(() => {
        console.log('candle deleted');
        var candle = {
          pair: pair,
          hr: hr,
          high: high,
          low: low
        }
        saveCandle(candle);
      })
    })
    .then(() => {
      res.end();
    })
  }
});

// accounts
app.post('/register', (req, res) => {
  // Form validation
  // console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  fetchUser(email)
  .then(user => {
    // console.log('user: ', user);
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
  // console.log('req.body: ', req.body);
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
    // console.log('user: ', user);
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

app.post('/forgotPassword', (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  fetchUser(email)
  .then(user => {
    if (!user) {
      console.log("user with given email does not exist");
      return res.status(400).send("user with given email does not exist");
    }
    fetchToken(user)
    .then(userToken => {
      if (!userToken) {
        var userID = user._id;
        var token = crypto.randomBytes(32).toString("hex");
        saveToken(userID, token);

        console.log('inside server just before sendEmail')
        const msg = `userID: ${userID}\ntoken: ${token}`;
        sendEmail(email, "Password Reset", msg)
        .then(() => {
          console.log('password reset sent to email');
          return res.send({});
        })
        .catch(err => console.log(err))
      } else {
        console.log('token already exists for this user');
        return res.send({});
      }
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

app.post('/password-reset', (req, res) => {
  console.log(req.body);
  if (req.body.userID){
    let userID = req.body.userID;
    let token = req.body.token;
    let password = req.body.password;
    fetchUserByID(userID)
    .then(user => {
      if (!user) {
        console.log('(1) invalid link or expired - unable to fetch user');
      } else {
        fetchToken(userID, token)
        .then(fetchedToken => {
          if (!fetchedToken) {
            console.log('(2) invalid link or expired - unable to fetch token')
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hashedPassword) => {
                console.log('hashedPassword: ', hashedPassword);
                user.password = hashedPassword
                updateUserByID(user)
                .then(() => {
                  console.log('successfully updated password');
                  deleteToken(userID);
                })
                .catch(err => console.log(err))
              });
            });
          }
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
  }
})

// apis
app.post('/postAPI', verifyJWT, (req, res) => {
  // Form validation
  // console.log(req.body);
  const { errors, isValid } = validateAPIInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const api_key = req.body.api_key;
  const secret = encrypt(req.body.secret);
  const isFTXUS = req.body.isFTXUS;
  const subAccountName = req.body.subAccountName;

  fetchUserByID(req.user.id)
  .then(user => {
    var duplicateFlag = false;
    user.credentials.forEach(credential => {
      if (credential.subAccountName === subAccountName) {
        duplicateFlag = true;
      }
    })
    if (!duplicateFlag) {
      // console.log('user: ', user);
      var credential = {
        api_key: api_key,
        secret: secret,
        isFTXUS: isFTXUS,
        subAccountName: subAccountName
      }
      user.credentials.push(credential);
      updateUserByID(user)
    } else {
      console.log('duplicate subAccountName: ', subAccountName);
    }
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    console.log('successfully updated user!');
    return fetchUserByID(req.user.id);
  })
  .then(user => {
    user.credentials.forEach(credential => {
      establishWSConnection(credential);
    })
    res.end();
  })
});

app.post('/setPairs', verifyJWT, (req, res) => {
  // console.log(req.body);
  const api_key = req.body["api_key"];
  const ethbtc = req.body["ETH/BTC"];
  const linkbtc = req.body["LINK/BTC"];
  const maticbtc = req.body["MATIC/BTC"];
  const solbtc = req.body["SOL/BTC"];
  const unibtc = req.body["UNI/BTC"];
  const ethusd = req.body["ETH/USD"];
  const linkusd = req.body["LINK/USD"];
  const maticusd = req.body["MATIC/USD"];
  const solusd = req.body["SOL/USD"];
  const uniusd = req.body["UNI/USD"];

  fetchUserByID(req.user.id)
  .then(user => {
    console.log('user: ', user);
    let credentialIndex = user.credentials.findIndex(credential => credential.api_key === api_key)
    user.credentials[credentialIndex].isSubscribedTo = {
      "ETH/BTC": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false },
      "LINK/BTC": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false },
      "MATIC/BTC": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false },
      "SOL/BTC": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false },
      "UNI/BTC": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false },
      "ETH/USD": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false },
      "LINK/USD": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false },
      "MATIC/USD": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false },
      "SOL/USD": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false },
      "UNI/USD": { "off": false, "1hr": false, "2hr": false, "4hr": false, "6hr": false, "12hr": false }
    }

    user.credentials[credentialIndex].isSubscribedTo["ETH/BTC"][ethbtc] = true;
    user.credentials[credentialIndex].isSubscribedTo["LINK/BTC"][linkbtc] = true;
    user.credentials[credentialIndex].isSubscribedTo["MATIC/BTC"][maticbtc] = true;
    user.credentials[credentialIndex].isSubscribedTo["SOL/BTC"][solbtc] = true;
    user.credentials[credentialIndex].isSubscribedTo["UNI/BTC"][unibtc] = true;
    user.credentials[credentialIndex].isSubscribedTo["ETH/USD"][ethusd] = true;
    user.credentials[credentialIndex].isSubscribedTo["LINK/USD"][linkusd] = true;
    user.credentials[credentialIndex].isSubscribedTo["MATIC/USD"][maticusd] = true;
    user.credentials[credentialIndex].isSubscribedTo["SOL/USD"][solusd] = true;
    user.credentials[credentialIndex].isSubscribedTo["UNI/USD"][uniusd] = true;

    console.log(user.credentials[credentialIndex].isSubscribedTo);

    updateUserByID(user)
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    console.log('successfully updated pairs!');
    return fetchUserByID(req.user.id);
  })
  .then(user => {
    user.credentials.forEach(credential => {
      establishWSConnection(credential);
    })
    res.end();
  })
});

app.post('/deleteAPI', verifyJWT, (req, res) => {
  // console.log(req.body);
  const api_key = req.body["api_key"];

  fetchUserByID(req.user.id)
  .then(user => {
    // console.log('user: ', user);
    let credentialIndex = user.credentials.findIndex(credential => credential.api_key === api_key)
    user.credentials.splice(credentialIndex, 1);
    updateUserByID(user)
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    console.log('successfully updated user!');
    return fetchUserByID(req.user.id);
  })
  .then(user => {
    user.credentials.forEach(credential => {
      establishWSConnection(credential);
    })
    res.end();
  })
});


let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
