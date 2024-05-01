const path = require('path');

module.exports = {
  entry: './index.ts',
  output: {
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
        test: /\.tsx?$/,
        use: ['ts-loader'],
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
