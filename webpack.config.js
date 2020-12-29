const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = dir => path.resolve(__dirname, dir);
const outputpath = resolve("dist")

module.exports = {
  entry: {
    main: "./src/main.js"
  },
  output: {
    path: outputpath,
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
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'], // '.jsx'  尝试按顺序解析这些后缀名
    alias: {
      '@': resolve("src"),
    }
  },
  // https://webpack.docschina.org/configuration/devtool/#root
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: outputpath,
    compress: true,
    open: false,
    disableHostCheck: true, // 当将此项配置设置为 true 时，将会跳过 host 检查
    port: 8081,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://mgr.mshz.com:9092', // 此处可以配合SwitchHosts 172.16.61.22 mgr.mshz.com
        ws: true,
        changeOrigin: true,
        hot: true, //即便HMR不生效，浏览器也不自动刷新，就开启hotOnly
        hotOnly: true
      }
    }
  }
}
