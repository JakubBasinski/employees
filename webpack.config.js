const path = require('path');

module.exports = {
  entry: './src/app.ts',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    host: '0.0.0.0',
    port: 3005,
    allowedHosts: 'all' 
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },
};
