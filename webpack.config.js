const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const port = 3000;
const dist = path.join(__dirname, "dist");
const src = path.join(__dirname, "src");

module.exports = () => ({
  entry: "./index.js",
  devtool: "source-map",
  context: src,
  devServer: {
    port,
    hot: true,
    historyApiFallback: true,
    watchFiles: src,
    open: true,
  },
  resolve: {
    modules: [src, "node_modules"],
    extensions: [".js", ".json"],
    alias: {
      src,
    },
  },
  output: {
    path: dist,
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`,
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, , "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      //   favicon: "./favicon.svg",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
        // onEnd: {
        //   copy: [
        //     {
        //       source: path.join("src", "assets"),
        //       destination: "dist",
        //     },
        //   ],
        // },
      },
    }),
  ],
  performance: {
    maxEntrypointSize: 5120000,
    maxAssetSize: 5120000,
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              ["svgo", { name: "preset-default" }],
            ],
          },
        },
      }),
    ],
  },
});
