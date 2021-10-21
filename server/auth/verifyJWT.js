const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require('../../database/index.js').User;


if (!process.env.API_KEY) {
  const config = require('../config.js');
}

const secretOrKey = process.env.secretOrKey || config.secretOrKey;

module.exports = verifyJWT = (req, res, next) => {
  console.log('inside verifyJWT');
  const token = req.headers["x-access-token"]?.split(' ')[1];
  console.log('token inside verifyJWT: ', token);

  if (token) {
    jwt.verify(token, secretOrKey, (err, decoded) => {
      if (err) {
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate"
        })
      }
      req.user = {};
      req.user.id = decoded.id;
      next()
    })
  } else {
    res.json({
      isLoggedIn: false,
      message: "Incorrect Token Given"
    })
  }
};