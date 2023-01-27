const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  target: "node16",
  entry: {
    cli: "./src/cli.ts",
  },
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  optimization: {
    minimize: false,
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ""),
    filename: "[name].js",
  },
  ignoreWarnings: [
    {
      module: /node_modules/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: process.env.NODE_ENV !== "dev",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
};
