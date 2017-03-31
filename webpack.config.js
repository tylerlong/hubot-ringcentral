const path = require('path')
import nodeExternals from 'webpack-node-externals'

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'index': './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'src'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              'targets': {
                'node': 4.2
              }
            }]
          ]
        }
      }
    }]
  }
}
