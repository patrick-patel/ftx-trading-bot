const establishRESTConnection = require('./ftx.js').establishRESTConnection;
const fetchAllUsers = require('../database/index.js').fetchAllUsers;
const cancelOrder = require('./ftx.js').cancelOrder;

module.exports = scrubDuplicates = () => {
  console.log('scrubbing duplicates');
  fetchAllUsers()
  .then(users => {
    users.forEach(user => {
      user.credentials.forEach(credential => {
        var connection = establishRESTConnection(credential);
        var client = connection.client;
        client.getOpenTriggerOrders()
        .then(orders => {
          // console.log('scrub orders: ', orders);
          var pairs = {
            'ETH/BTC': {'buy': false, 'sell': false},
            'LINK/BTC': {'buy': false, 'sell': false},
            'MATIC/BTC': {'buy': false, 'sell': false},
            'SOL/BTC': {'buy': false, 'sell': false},
            'UNI/BTC': {'buy': false, 'sell': false},
            'ETH/USD': {'buy': false, 'sell': false},
            'LINK/USD': {'buy': false, 'sell': false},
            'MATIC/USD': {'buy': false, 'sell': false},
            'SOL/USD': {'buy': false, 'sell': false},
            'UNI/USD': {'buy': false, 'sell': false},
          }
          orders.result.forEach(order => {
            var orderID = order.id;
            var pair = order.market;
            var side = order.side;
            if (pairs[pair][side]) {
              console.log('scrubbing order: ', orderID);
              cancelOrder(client, orderID)
              .catch(err => console.log(err))
            } else {
              pairs[pair][side] = true;
            }
          })
        })
        .catch(err => console.log(err))
      })
    })
    console.log('scrub complete');
  })
}
scrubDuplicates();