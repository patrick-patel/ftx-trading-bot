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
  return Candle.find({"pair": pair}).sort({"_id":-1}).limit(1);
}

// Order store
let orderSchema = mongoose.Schema({
  pair: String,
  orderID: Number
});

let Order = mongoose.model('Order', orderSchema);

let saveOrder = (pair, orderID) => {
  console.log('saving order')
  var orderInstance = new Order({ pair: pair, orderID: orderID })
  orderInstance.save()
    .then(data => {
      console.log('saved!');
      return data;
    })
}

let fetchOrder = (pair) => {
  console.log('fetching order');
  return Order.find({"pair": pair}).sort({"_id":-1}).limit(1);
}


module.exports.saveCandle = saveCandle;
module.exports.fetchCandle = fetchCandle;
module.exports.saveOrder = saveOrder;
module.exports.fetchOrder = fetchOrder;

