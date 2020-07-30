const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    filename: "index.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist"),
    jsonpFunction: "webpackJsonp_team_green",
  },
  module: {
    rules: [
      {
        parser: {
          system: false,
        },
      },
      {
        test: /\.m?(js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          esModule: false,
          name: "[name].[ext]",
        },
      },
    ],
  },
  devtool: "sourcemap",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    disableHostCheck: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  externals: ["react", "react-dom", "react-router-dom"],
};
