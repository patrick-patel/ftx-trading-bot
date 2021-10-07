const axios = require('axios');
const config = require('../config.js');

const { RestClient } = require('ftx-api');
const RestClientUtils = require('ftx-api/lib/util/requestUtils');

var forge = require('node-forge');
// const hmac = require('hmac');

let getAccountValue = (subName) => {
  console.log('retrieving account value from ftx');

  const key = config.API_KEY;
  const secret = config.secret;

  const restClientOptions = {
    domain: 'ftxus'
  };

  const client = new RestClient(key, secret, restClientOptions);
  console.log(client)
  client.getBalances()
  .then((data) => {
    console.log(data);
  })


  // var ts = new Date().getTime();
  // var method = 'GET';
  // var path_url = `subaccounts/`;
  // var signature_payload = `${ts}${method}/${path_url}`;
  // signature_payload = forge.util.encodeUtf8(signature_payload);
  // var hmac = forge.md.sha256.create();
  // hmac.update(forge.util.encodeUtf8(config.secret), signature_payload);
  // var signature = hmac.digest().toHex();
  // console.log('ts: ', ts.toString());
  // console.log('signature payload: ', signature_payload);
  // console.log('signature: ', signature);

  // // `subaccounts/${subName}/balances`
  // // forge.util.encodeUtf8(str);
  // // subaccounts/${subName}/balances

  // let options = {
  //   url: `https://ftx.us/api/subaccounts`,
  //   headers: {
  //     'FTXUS-KEY': config.API_KEY,
  //     'FTX-SIGN': signature,
  //     'FTX-TS': ts.toString(),
  //     'FTXUS-SUBACCOUNT': subName
  //     // 'Authorization': `token ${process.env.TOKEN}` || `token ${config.TOKEN}`
  //   }
  // };

  // return axios(options);
}

let postMarketSellOrder = (user) => {
  console.log('retrieving repos from github');
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
      // 'Authorization': `token ${process.env.TOKEN}` || `token ${config.TOKEN}`

    }
  };

  return axios(options);
}

let postMarketBuyOrder = (user) => {
  console.log('retrieving repos from github');
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
      // 'Authorization': `token ${process.env.TOKEN}` || `token ${config.TOKEN}`

    }
  };

  return axios(options);
}

module.exports.getAccountValue = getAccountValue;
module.exports.postMarketSellOrder = postMarketSellOrder;
module.exports.postMarketBuyOrder = postMarketBuyOrder;
