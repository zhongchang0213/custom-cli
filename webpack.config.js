const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  entry: {
    main: "./src/main.js"
  },
  output: {
    path: resolve("dist"),
    filename: "js/[name]_[hash:8].js",
  },
  module: {
    rules: [{
        test: /\.css$/i,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
              // hmr: true, // 模块热替换，仅需在开发环境开启
            }
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: "images/[name]_[hash:8].[ext]",
            // outputPath: "images/",
            // publicPath: "./",
            //小于3kb，才转换成base64
            limit: 3 * 1024,
          },
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: "file-loader"
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name][chunkhash:8].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("index.html"),
      filename: "index.html"
    })
  ]
}
