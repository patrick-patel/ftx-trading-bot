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
  }
});

let User = mongoose.model('User', userSchema);

let saveUser = (email, password) => {
  console.log('saving order')
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
  console.log('fetching order');
  return Order.find({"email": email}).exec();
}


module.exports.saveCandle = saveCandle;
module.exports.fetchCandle = fetchCandle;
module.exports.saveUser = saveUser;
module.exports.fetchUser = fetchUser;

