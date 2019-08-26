const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const Critters = require("critters-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  dist: path.join("./dist")
};

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve("./dist"),
    filename: "bundle.js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
              // options...
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        loader: "file-loader",
        options: {
          outputPath: "images"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    }),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.dist}/**/*`, { nodir: true })
    // }),
    new Critters({
      pruneSource: false
    })
  ]
};
