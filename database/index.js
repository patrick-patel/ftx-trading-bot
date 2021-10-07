const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/fetcher'

const options = {
  useNewUrlParser: true,
};

mongoose.connect(mongoURI, options);

let repoSchema = mongoose.Schema({
  username: String,
  repoName: String,
  repoUrl: { type: String, unique: true, dropDups: true },
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  var promises = [];
  repos.forEach(repo => {
    var repoInstance = new Repo({
      username: repo.owner.login,
      repoName: repo.name,
      repoUrl: repo.html_url,
      forks: repo.forks,
    })
    // console.log(repoInstance);
    promises.push(repoInstance.save()
      .then((data) => {
        // console.log('saved!');
        return data;
      })
    )
  })
  return Promise.all(promises);
}

let fetchTop25 = () => {
  console.log('fetching top 25');
  return Repo.find().sort({ forks: -1 }).limit(25);
}

module.exports.save = save;
module.exports.fetchTop25 = fetchTop25;