try
  {Robot,Adapter,TextMessage,User} = require 'hubot'
catch
  prequire = require('parent-require')
  {Robot,Adapter,TextMessage,User} = prequire 'hubot'

GlipClient = require './bot'


class GlipAdapter extends Adapter

  constructor: ->
    super
    @robot.logger.info "Constructor"

    @client = new GlipClient({
      host: 'glip.com',
      port: 443,
      user: process.env.HUBOT_GLIP_EMAIL,
      password: process.env.HUBOT_GLIP_PASSWORD
    })

    @client.on 'message', (type, data) =>
      if (type == @client.type_ids.TYPE_ID_POST && data.text)
        user = new User data.group_id, name: 'Sample User'
        message = new TextMessage user, data.text, 'MSG-' + data._id
        @robot.receive message

  send: (envelope, strings...) ->
    for str in strings
      @robot.logger.info "Send " + str
      @client.post envelope.user.id, str

  reply: (envelope, strings...) ->
    for str in strings
      @robot.logger.info "Reply " + str
      @client.post envelope.user.id, str

  run: ->
    @robot.logger.info "Run"

    @client.start()

    @client.on 'started', =>
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
