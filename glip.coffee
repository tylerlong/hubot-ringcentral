GlipAdapter = require './src/adapter'

exports.use = (robot) ->
  new GlipAdapter robot
