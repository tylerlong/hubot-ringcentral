export default {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    library: 'HubotGlip',
    libraryTarget: 'umd',
    globalObject: 'this' // fix window undefined issue in node
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
