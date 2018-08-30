export default {
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: {
    hubot: {
      commonjs: 'hubot',
      commonjs2: 'hubot',
      amd: 'hubot',
      root: 'hubot'
    }
  }
}
