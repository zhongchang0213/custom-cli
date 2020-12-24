const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name]_[hash:8].js",
  },
  resolveLoader: {
    modules: ["./node_modules", "./myLoaders"],
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/i,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     "postcss-loader",
      //   ],
      // },
      // {
      //   test: /.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
      {
        test: /.less$/,
        use: ["styleLoader", "cssLoader", "lessLoader"],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     "postcss-loader",
      //     {
      //       loader: "less-loader",
      //     },
      //   ],
      // },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     "postcss-loader",
      //     "sass-loader",
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: "[name]_[hash:8].[ext]",
            outputPath: "images/",
            //小于2048，才转换成base64
            limit: 1024,
          },
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "css/[name][chunkhash:8].css",
    //   chunkFilename: "[id].css"
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html"
    })
  ]
}
