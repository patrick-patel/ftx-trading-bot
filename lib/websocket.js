
 const fetchAllUsers = require('../database/index.js').fetchAllUsers;
 const establishWSConnection = require('./ftx.js').establishWSConnection;

 module.exports = establishWSConnectionOnStart = () => {
   console.log('establishing connections on start');
   fetchAllUsers()
   .then(users => {
     users.forEach(user => {
       user.credentials.forEach(credential => {
         establishWSConnection(credential);
       })
     })
   })
 }

 establishWSConnectionOnStart();
