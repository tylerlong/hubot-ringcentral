GlipAdapter = require './src/adapter'

exports.use = (robot) ->
  new GlipAdapter robot, email: process.env.HUBOT_GLIP_EMAIL, password: process.env.HUBOT_GLIP_PASSWORD
