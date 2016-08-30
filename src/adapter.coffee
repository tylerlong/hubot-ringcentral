try
  {Robot,Adapter,TextMessage,User} = require 'hubot'
catch
  prequire = require('parent-require')
  {Robot,Adapter,TextMessage,User} = prequire 'hubot'


class GlipAdapter extends Adapter

  constructor: (@robot, @options) ->
    super
    @client = new GlipClient(@options)
    @robot.logger.info "Constructor"

  send: (envelope, strings...) ->
    @robot.logger.info "Send"

  reply: (envelope, strings...) ->
    @robot.logger.info "Reply"

  run: ->
    @robot.logger.info "Run"
    @emit "connected"
    user = new User 1001, name: 'Glip User'
    message = new TextMessage user, 'Some Glip Message', 'MSG-001'
    @robot.receive message


module.exports = GlipAdapter