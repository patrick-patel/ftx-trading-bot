const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // incoming req with no cookie >>> create session
  if (!req.cookies) {
    models.Sessions.create()
      .then(function(data) {
        models.Sessions.get({ id: data.insertId })
          .then(function(session) {
            req.session = { hash: session.hash };
            res.cookie('shortlyid', session.hash);
            next();
          });
      });
  } else {
    models.Sessions.get({ hash: req.cookies.shortlyid })
      .then(function(data) {
        //incoming req with valid cookie >>> use cookie as session hash
        if (data) {
          if (data.userId) {
            var userId = data.userId;
            req.session = { hash: data.hash };
            req.session.userId = userId;
            models.Users.get({ id: userId })
              .then(function(user) {
                req.session.user = { username: user.username };
                next();
              });
          } else {
            req.session = { hash: data.hash };
            next();
          }
        } else {
          //incoming req with not valid cookie >> create another session
          models.Sessions.create()
            .then(function(data) {
              models.Sessions.get({ id: data.insertId })
                .then(function(session) {
                  req.session = { hash: session.hash };
                  res.cookie('shortlyid', session.hash);
                  models.Users.get({ username: req.body.username })
                    .then(function(user) {
                      // req.body.username >>>> find userid >>> update session
                      var userId = user.id;
                      console.log('line 62 userid:', userId);
                      models.Sessions.update({ hash: session.hash }, { userId: userId })
                        .then(function(data) {
                          console.log(data);
                          next();
                          models.Sessions.get({ hash: session.hash })
                            .then(function(data) {
                              console.log('updated session data:', data);
                            });
                        });
                    }).catch(function() {
                      next();
                    });
                });
            });
        }
      });
  }
};


// CREATE TABLE IF NOT EXISTS sessions (
//   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   hash VARCHAR(64),
//   userId INT
// )

// create() {
//   let data = utils.createRandom32String();
//   let hash = utils.createHash(data);
//   return super.create.call(this, { hash });
// }

// create(options) {
//   let queryString = `INSERT INTO ${this.tablename} SET ?`;
//   return executeQuery(queryString, options);
// }

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

