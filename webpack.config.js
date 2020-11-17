var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: "dist",
    open: true
  },
  entry: {
    'spctr_room': './src/spctr_room.js',
    'page2': './src/index2.js'
  },
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: '[name]/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'spctr_room',
      template: './src/template.html',
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      chunks: ['spctr_room'],
      filename: 'spctr_room/index.html'
    }),
    new HtmlWebpackPlugin({
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      chunks: ['page2'],
      filename: 'page2/index.html'
    })
  ],
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                "@babel/preset-env"
              ]
            }
          }
        ]
      }
    ]
  },
};