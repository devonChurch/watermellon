const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PRODUCTION_ENV = "production";
const DEVELOPMENT_ENV = "development";
const { NODE_ENV = PRODUCTION_ENV } = process.env;
const isProduction = NODE_ENV === PRODUCTION_ENV;
const distDir = resolve(__dirname, "dist");
const srcDir = resolve(__dirname, "src");

module.exports = {
  mode: isProduction ? PRODUCTION_ENV : DEVELOPMENT_ENV,

  target: "node",

  entry: `${srcDir}/index.js`,

  output: {
    path: distDir,
    filename: "index.js",
    libraryTarget: "commonjs"
  },

  devtool: isProduction ? "source-map" : "cheap-source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        },
        include: srcDir
      }
    ]
  },
  externals: ["puppeteer"],

  plugins: [new CleanWebpackPlugin()],

  resolve: {
    extensions: [".js"]
  }
};
