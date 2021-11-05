// ftx requests
const establishRESTConnection = require('../lib/ftx.js').establishRESTConnection;
const getAccountValue = require('../lib/ftx.js').getAccountValue;

// database calls
const fetchAllUsers = require('../database/index.js').fetchAllUsers;
const updateUserByID = require('../database/index.js').updateUserByID;

module.exports = chartSnap = () => {
  console.log('capturing snapshot');
  fetchAllUsers()
  .then(users => {
    users.forEach(user => {
      var promises = [];
      user.credentials.forEach(credential => {
        var connection = establishRESTConnection(credential);
        promises.push(getAccountValue(connection)
        .then(data => {
          var total = 0;
          data.result.forEach(walletEntity => {
            total += walletEntity.usdValue;
          })
          let credentialIndex = user.credentials.findIndex(item => item.api_key === credential.api_key)
          console.log('chart data before: ', user.credentials[credentialIndex].chartData);
          if (user.credentials[credentialIndex].chartData.length >= 12) {
            user.credentials[credentialIndex].chartData.shift();
          }
          user.credentials[credentialIndex].chartData.push(total);
          console.log('chart data after: ', user.credentials[credentialIndex].chartData);
        })
        .catch(err => {
          console.log(err);
        }))
      })
      Promise.all(promises)
      .then(() => {
        updateUserByID(user)
      })
    })
  })
}

setInterval(chartSnap, 86400000);