const path = require('path');

module.exports = {
  entry: './index.ts',
  output: {
    library: 'mswDevTool',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.join(__dirname, 'dist'),
    filename: `index.js`,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(m?js|ts)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'], // babel은 빌드시 타입검사를 해주지 않으므로 ts-loader도 함께 설정
      },
      {
        test: /\.svg$/,
        use: ['preact-svg-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
