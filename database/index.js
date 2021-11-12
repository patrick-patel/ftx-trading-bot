const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/fetcher'

const options = {
  useNewUrlParser: true,
};

mongoose.connect(mongoURI, options);

// Candle Store
let candleSchema = mongoose.Schema({
  pair: String,
  hr: String,
  high: Number,
  low: Number,
});

let Candle = mongoose.model('Candle', candleSchema);

let saveCandle = (candle) => {
  console.log('saving candle: ', candle);
  var candleInstance = new Candle(candle)
  candleInstance.save()
    .then(data => {
      console.log('saved!');
      return data;
    })
}

let fetchCandle = (pair, hr) => {
  console.log('fetching candle for pair: ', pair);
  console.log('...and hr: ', hr);
  return Candle.find({"pair": pair, "hr": hr}).sort({"_id":-1}).limit(1).exec();
}

let deleteCandle = (pair, hr) => {
  console.log('deleting candle(s) for pair: ', pair);
  console.log('...and hr: ', hr);
  return Candle.deleteMany({"pair": pair, "hr": hr}).exec();
}

// Order store
let userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  credentials: [{
    api_key: String,
    secret: String,
    isFTXUS: Boolean,
    subAccountName: String,
    chartData: [Number],
    isSubscribedTo: {
      "ETH/BTC": {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      },
      "LINK/BTC": {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      },
      'MATIC/BTC': {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      },
      "SOL/BTC": {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      },
      "UNI/BTC": {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      },
      "ETH/USD": {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      },
      "LINK/USD": {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      },
      'MATIC/USD': {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      },
      "SOL/USD": {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      },
      "UNI/USD": {
        "off": { type: Boolean, default: true },
        "1hr": { type: Boolean, default: false },
        "2hr": { type: Boolean, default: false },
        "4hr": { type: Boolean, default: false },
        "6hr": { type: Boolean, default: false },
        "12hr": { type: Boolean, default: false },
      }
    }
  }]
});

let User = mongoose.model('User', userSchema);

let saveUser = (email, password) => {
  console.log('saving user: ', email)
  var userInstance = new User({
    email: email,
    password: password
  })
  userInstance.save()
  .then(data => {
    console.log('saved user!');
    return data;
  })
}

let fetchAllUsers = () => {
  console.log('fetchin all users');
  return User.find().exec();
}

let fetchUser = (email) => {
  console.log('fetching user: ', email);
  return User.findOne({"email": email}).exec();
}

let fetchUserByID = (id) => {
  console.log('fetching user by id: ', id);
  return User.findOne({"_id": id}).exec();
}

let updateUserByID = (user) => {
  console.log('updating user by id: ', user.id);
  return User.findOneAndUpdate({"_id": user.id}, user, {setDefaultOnInsert: false}).exec();
}

// Token store
let tokenSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,// this is the expiry time in seconds
  },
});

let Token = mongoose.model("Token", tokenSchema);

let saveToken = (userID, token) => {
  console.log('saving token for userID: ', userID)
  var tokenInstance = new Token({
    userID: userID,
    token: token
  })
  tokenInstance.save()
  .then(data => {
    console.log('saved token!');
    return data;
  })
}

let fetchToken = (userID, token) => {
  return Token.findOne({"userID": userID, "token": token}).exec();
}

let deleteToken = (userID) => {
  console.log('deleting token for userID: ', userID);
  console.log('...and hr: ', hr);
  return Token.deleteMany({"userID": userID}).exec();
}

module.exports.saveCandle = saveCandle;
module.exports.fetchCandle = fetchCandle;
module.exports.deleteCandle = deleteCandle;
module.exports.saveUser = saveUser;
module.exports.fetchAllUsers = fetchAllUsers;
module.exports.fetchUser = fetchUser;
module.exports.fetchUserByID = fetchUserByID;
module.exports.updateUserByID = updateUserByID;
module.exports.saveToken = saveToken;
module.exports.fetchToken = fetchToken;
module.exports.deleteToken = deleteToken;
module.exports.User = User;

