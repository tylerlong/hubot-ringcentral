let hubot = null
try {
  hubot = require('hubot')
} catch (_) {
  const prequire = require('parent-require')
  hubot = prequire('hubot')
}
const { Adapter, TextMessage, User } = hubot
const GlipSocket = require('glip.socket.io')

class GlipAdapter extends Adapter {
  constructor (robot) {
    super(robot)
    this.robot.logger.info('Constructor')
    this.client = new GlipSocket({
      host: process.env.HUBOT_GLIP_HOST || 'glip.com',
      port: process.env.HUBOT_GLIP_PORT || 443,
      user: process.env.HUBOT_GLIP_EMAIL,
      password: process.env.HUBOT_GLIP_PASSWORD
    })
    this.client.on('message', (type, data) => {
      this.robot.logger.info(`${type} : ${JSON.stringify(data, null, 4)}`)
      const user = new User(data.creator_id, {
        room: data.group_id,
        reply_to: data.group_id,
        name: `User ${data.creator_id} from Group ${data.group_id}`
      })
      const message = new TextMessage(user, data.text, 'MSG-' + data._id)
      this.robot.receive(message)
    })
  }

  send (envelope) {
    const strings = arguments.slice(1)
    this.robot.logger.info('send ' + JSON.stringify(envelope, null, 4) + '\n\n' + strings.join('\n\n'))
    if (envelope.message_type === 'image_url') { // send image by url
      strings.forEach((str) => {
        this.client.post_file_from_url(envelope.user.reply_to, str, '')
      })
    } else {
      this.client.post(envelope.user.reply_to, strings.join('\n'))
    }
  }

  reply (envelope) {
    const strings = arguments.slice(1)
    this.robot.logger.info('reply ' + JSON.stringify(envelope, null, 4) + '\n\n' + strings.join('\n\n'))
    this.client.post(envelope.user.reply_to, strings.join('\n'))
  }

  run () {
    this.robot.logger.info('Run')
    this.client.start()
    this.client.on('started', () => {
      this.emit('connected')
    })
  }
}

module.exports = GlipAdapter
