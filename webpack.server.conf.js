const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.conf");
module.exports = merge(base, {
  target: "node",
  entry: "./src/entry-server.js",
  output: {
    filename: "bundle.server.js",
    libraryTarget: "commonjs2",
  },
  plugins: [],
});
