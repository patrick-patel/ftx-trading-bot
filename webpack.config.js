var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: {
          loader: "style-loader!css-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        // exclude: /node_modules/,
        use:{
          loader: 'file-loader',
        },
      },
    ],
  },
};
