try
  { Adapter, TextMessage, User } = require 'hubot'
catch
  prequire = require('parent-require')
  { Adapter, TextMessage, User } = prequire 'hubot'

GlipClient = require './bot'


class GlipAdapter extends Adapter

  constructor: ->
    super
    @robot.logger.info "Constructor"

    @client = new GlipClient({
      host: process.env.HUBOT_GLIP_HOST || 'glip.com',
      port: 443,
      user: process.env.HUBOT_GLIP_EMAIL,
      password: process.env.HUBOT_GLIP_PASSWORD
    })

    @client.on 'message', (type, data) =>
      @robot.logger.info type + ' : ' + JSON.stringify(data, null, 4)
      if (type == @client.type_ids.TYPE_ID_POST && data.text && !data.deactivated)
        user = new User data.group_id, room: data.group_id, reply_to: data.group_id, name: 'Group #' + data.group_id
        message = new TextMessage user, data.text, 'MSG-' + data._id
        @robot.receive message

  send: (envelope, strings...) ->
    @robot.logger.info 'send ' + JSON.stringify(envelope, null, 4) + '\n\n' + strings.join('\n\n')
    if envelope.message_type == 'image_url' # send image by url
      for str in strings
        @client.post_file_from_url envelope.user.reply_to, str, ''
    else
      @client.post envelope.user.reply_to, strings.join('\n')

  reply: (envelope, strings...) ->
    @robot.logger.info 'reply ' + JSON.stringify(envelope, null, 4) + '\n\n' + strings.join('\n\n')
    @client.post envelope.user.reply_to, strings.join('\n')

  run: ->
    @robot.logger.info "Run"

    @client.start()

    @client.on 'started', =>
      @emit "connected"


module.exports = GlipAdapter
