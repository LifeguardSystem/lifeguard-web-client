const path = require("path");
const fs = require("fs");

module.exports = {
  entry: path.join(__dirname, "/src/app/presenter/"),
  output: {
    path: path.join(__dirname, "/app-vanilla-js"),
    filename: "[name].js",
    libraryTarget: "umd",
  },
  cache: true,
  target: "node",
  externals: fs.readdirSync("node_modules"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};
