const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/fetcher'

const options = {
  useNewUrlParser: true,
};

mongoose.connect(mongoURI, options);

// Candle Store
let candleSchema = mongoose.Schema({
  pair: String,
  high: Number,
  low: Number,
});

let Candle = mongoose.model('Candle', candleSchema);

let saveCandle = (candle) => {
  console.log('saving candle')
  var candleInstance = new Candle(candle)
  candleInstance.save()
    .then(data => {
      console.log('saved!');
      return data;
    })
}

let fetchCandle = (pair) => {
  console.log('fetching candle');
  return Candle.find({"pair": pair}).sort({"_id":-1}).limit(1).exec();

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
  api_key: String,
  secret: String
});

let User = mongoose.model('User', userSchema);

let saveUser = (email, password) => {
  console.log('saving user')
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

let fetchUser = (email) => {
  console.log('fetching user');
  return User.findOne({"email": email}).exec();
}

let fetchUserByID = (id) => {
  console.log('fetching user');
  return User.findOne({"_id": id}).exec();
}

let updateUserByID = (user) => {
  console.log('updating user');
  return User.findOneAndUpdate({"_id": user.id}, user).exec();
}

module.exports.saveCandle = saveCandle;
module.exports.fetchCandle = fetchCandle;
module.exports.saveUser = saveUser;
module.exports.fetchUser = fetchUser;
module.exports.fetchUserByID = fetchUserByID;
module.exports.updateUserByID = updateUserByID;
module.exports.User = User;

