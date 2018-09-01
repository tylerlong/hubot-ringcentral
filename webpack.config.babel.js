// import nodeExternals from 'webpack-node-externals'

export default {
  target: 'node',
  // externals: [nodeExternals()],
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    libraryTarget: 'commonjs2'
  }
}
