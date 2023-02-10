var path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, './src/main.js'),//打包入口文件路径
  output: {
    path: path.resolve(__dirname, './dist'), // 输出文件路径
    filename: 'bundle.js', // 输出文件
    clean:true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
       extractComments: false, //不将注释提取到单独的文件中
    })],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // 预设：知识babel做怎样的兼容性处理
            "presets": [
              ["@babel/preset-env", {
                // 按需加载
                "useBuiltIns": "usage",
                // 指定core-js版本
                "corejs": 3,
                // 指定浏览兼容性版本
                "targets": {
                  "chrome": "60",
                  "firefox": "60",
                  "ie": "9",
                  "safari": "10",
                  "edge": "17"
                }
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    //打包HTML
    new htmlWebpackPlugin({
      //HTML模板路径
      template: './src/index.html',
      filename: 'sharingtransfer.html',
    })
  ],
  devServer:{
    static:'./src',
    // port:4000,// 指定端口号(问题:不能多开,多开会报错,一般默认就行)
    open:true,// 自动打开网页
    // host:'local-ip', // 指定以ip打开页面,不想指定则去掉此选项即可
    // hot:true
  }
}