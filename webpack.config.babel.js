import nodeExternals from 'webpack-node-externals'
import path from 'path'

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'index.bundle.js',
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
