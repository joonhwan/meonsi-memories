const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

const dir = (subpath) => path.join(__dirname, subpath);

const dev = process.env.NODE_ENV !== "production";
console.log("@@@ dev = ", dev);

module.exports = {
  mode: dev ? "development" : "production",
  target: "web", //dev ? "web" : "browserslist",
  entry: {
    main: dir("src/index.js"),
  },
  output: {
    path: dir("public"),
    //publicPath: "/assets/",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_module\//,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    //browsers: ["> 1% in KR"], // browserliset
                    esmodules: true,
                  },
                  debug: dev,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              dev && "react-refresh/babel", //
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [dev && new ReactRefreshWebpackPlugin()].filter(Boolean),
  devServer: {
    contentBase: dir("public"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: true,
  },
};
