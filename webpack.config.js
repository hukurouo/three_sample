var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: "dist",
    open: true
  },
  entry: {
    'spctr_room': './src/spctr_room.ts',
    'hatobatsugu': './src/tugu.ts',
    'spctr_switch': './src/spctr_switch.ts'
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
      title: 'hatobatsugu',
      template: './src/template.html',
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      chunks: ['hatobatsugu'],
      filename: 'hatobatsugu/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'spctr_switch',
      template: './src/template.html',
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      chunks: ['spctr_switch'],
      filename: 'spctr_switch/index.html'
    })
  ],
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      }
    ]
  },
};