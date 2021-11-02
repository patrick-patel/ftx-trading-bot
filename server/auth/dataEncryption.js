const CryptoJS = require("crypto-js");
const EncKey = process.env.EncKey;


// Encrypt
let encrypt = (string) => {
  var ciphertext = CryptoJS.AES.encrypt(string, EncKey).toString();
  return ciphertext;
}

// Decrypt
let decrypt = (ciphertext) => {
  var bytes  = CryptoJS.AES.decrypt(ciphertext, EncKey);
  var data = bytes.toString(CryptoJS.enc.Utf8);
  return data;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;

