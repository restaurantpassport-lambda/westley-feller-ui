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
  entry: {
    main: ["./src/js/main.js", "./src/scss/main.scss"],
    index: ["./src/js/index.js", "./src/scss/index.scss"],
    about: ["./src/js/about.js", "./src/scss/about.scss"]
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].bundle.js"
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
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
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
      template: "src/pages/index.html",
      templateParameters: {
        title: "Restaurant Passport",
        description: "Marketing page for Restaurant Passport"
      },
      inject: false,
      favicon: "favicon.png"
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "src/pages/about.html",
      templateParameters: {
        title: "About Us",
        description: "About us page for the Restaurant Passport app"
      },
      inject: false,
      favicon: "favicon.png"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
      chunkFilename: "[name].css"
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),
    new Critters({
      pruneSource: false
    })
  ]
};
