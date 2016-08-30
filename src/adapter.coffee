try
  {Robot,Adapter,TextMessage,User} = require 'hubot'
catch
  prequire = require('parent-require')
  {Robot,Adapter,TextMessage,User} = prequire 'hubot'

Bot = require './bot'


class GlipAdapter extends Adapter

  constructor: ->
    super
    @robot.logger.info "Constructor"

  send: (envelope, strings...) ->
    @robot.logger.info "Send " + strings[0]

  reply: (envelope, strings...) ->
    @robot.logger.info "Reply " + strings[0]

  run: ->
    @robot.logger.info "Run"
    @emit "connected"
    user = new User 1001, name: 'Sample User'
    message = new TextMessage user, 'hubot stars', 'MSG-001'
    message2 = new TextMessage user, 'hubot help', 'MSG-002'
    message3 = new TextMessage user, 'hubot map Xiamen', 'MSG-003'
    @robot.receive message
    setTimeout(
      =>
        @robot.receive message
        @robot.receive message2
        @robot.receive message3
      3000
    )


module.exports = GlipAdapter
