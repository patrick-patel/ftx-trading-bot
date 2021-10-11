const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/fetcher'

const options = {
  useNewUrlParser: true,
};

mongoose.connect(mongoURI, options);

let candleSchema = mongoose.Schema({
  high: Number,
  low: Number,
});

let Candle = mongoose.model('Candle', candleSchema);

let save = (candle) => {
  candle.save()
    .then(data => {
      console.log('saved!');
      return data;
    })
}

let fetchCandle = () => {
  console.log('fetching candle');
  return Candle.find().sort({ _id: -1 }).limit(1);
}

module.exports.save = save;
module.exports.fetchCandle = fetchCandle;