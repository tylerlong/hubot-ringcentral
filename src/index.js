let hubot = null
try {
  hubot = require('hubot')
} catch (_) {
  const prequire = require('parent-require')
  hubot = prequire('hubot')
}
const { Adapter, TextMessage, User } = hubot
const GlipClient = require('glip-client')

class GlipAdapter extends Adapter {
  constructor (robot) {
    super(robot)
    this.robot.logger.info('Constructor')
    this.client = new GlipClient({
      server: process.env.HUBOT_GLIP_SERVER || 'https://platform.ringcentral.com',
      appKey: process.env.HUBOT_GLIP_APP_KEY,
      appSecret: process.env.HUBOT_GLIP_APP_SECRET,
      appName: 'Glip Chatbot',
      appVersion: '1.0.0'
    })
  }

  login () {
    this.client.authorize({
      username: process.env.USERNAME,
      extension: '',
      password: process.env.PASSWORD
    }).then((response) => {
      this.emit('connected')
      this.subscribe()
    })
  }

  subscribe () {
    this.client.posts().subscribe((message) => {
      this.robot.logger.info(JSON.stringify(message, null, 4))
      if (message.messageType === 'PostAdded' && message.post.text && message.post.text !== '') {
        const user = new User(message.creatorId, {
          room: message.groupId,
          reply_to: message.groupId,
          name: `User ${message.creatorId} from Group ${message.groupId}`
        })
        const message = new TextMessage(user, message.text, 'MSG-' + message.id)
        this.robot.receive(message)
      }
    })
  }

  send (envelope, string) {
    this.robot.logger.info('send ' + JSON.stringify(envelope, null, 4) + '\n\n' + string)
    this.client.posts().post({ groupId: envelope.user.reply_to, text: string })
  }

  reply (envelope, string) {
    this.robot.logger.info('reply ' + JSON.stringify(envelope, null, 4) + '\n\n' + string)
    this.client.posts().post({ groupId: envelope.user.reply_to, text: string })
  }

  run () {
    this.robot.logger.info('Run')
    this.login()
  }
}

exports.use = function (robot) {
  return new GlipAdapter(robot)
}
