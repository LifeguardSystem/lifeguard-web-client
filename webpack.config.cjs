const path = require("path");
const fs = require("fs");

const configBase = {
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

const home = {
  entry: path.join(__dirname, "/src/app/presenter/home.ts"),
  output: {
    path: path.join(__dirname, "/app-vanilla-js"),
    filename: "home.js",
  },
};

const group = {
  entry: path.join(__dirname, "/src/app/presenter/group.ts"),
  output: {
    path: path.join(__dirname, "/app-vanilla-js"),
    filename: "group.js",
  },
};

const global = {
  entry: path.join(__dirname, "/src/app/presenter/global.ts"),
  output: {
    path: path.join(__dirname, "/app-vanilla-js"),
    filename: "global.js",
  },
};

module.exports = [
  { ...home, ...configBase },
  { ...group, ...configBase },
  { ...global, ...configBase },
];
