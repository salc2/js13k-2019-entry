const path = require('path');

module.exports = {
  entry: './src/index.ts',
//  devtool: 'inline-source-map',
 mode: 'production',
//  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.c$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, 'dist')
  }
};

