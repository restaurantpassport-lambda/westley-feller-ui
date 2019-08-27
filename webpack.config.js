const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const Critters = require("critters-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ResponsiveLoader = require("responsive-loader/sharp");

const PATHS = {
  src: path.join(__dirname, "src"),
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
        test: /\.(jpg|png)$/i,
        loader: "responsive-loader",
        options: {
          // If you want to enable sharp support:
          adapter: ResponsiveLoader,
          sizes: [768, 1024, 1216, 1408],
          outputPath: "images"
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
            // options: {
            //   url: false
            // }
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
      inject: false,
      favicon: "favicon.png"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),
    new Critters({
      pruneSource: false
    })
  ]
};
