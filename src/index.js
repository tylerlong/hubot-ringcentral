import RingCentral, { SERVER_PRODUCTION } from 'ringcentral-ts'
import pkg from '../package.json'

let hubot = null
try {
  hubot = require('hubot')
} catch (_) {
  const prequire = require('parent-require')
  hubot = prequire('hubot')
}

const { Adapter, TextMessage, User } = hubot

class GlipAdapter extends Adapter {
  constructor (robot) {
    super(robot)
    this.client = new RingCentral({
      server: process.env.HUBOT_GLIP_SERVER || SERVER_PRODUCTION,
      appKey: process.env.HUBOT_GLIP_APP_KEY,
      appSecret: process.env.HUBOT_GLIP_APP_SECRET
    })
    this.client.agents.push(`${pkg.name}/${pkg.version}`)
  }

  login () {
    this.client.auth({
      username: process.env.HUBOT_GLIP_USERNAME,
      extension: process.env.HUBOT_GLIP_EXTENSION,
      password: process.env.HUBOT_GLIP_PASSWORD
    }).then((response) => {
      this.robot.logger.info('Logged in.')
      this.emit('connected')
      this.subscribe()
    }).catch((error) => {
      this.robot.logger.error(`Login failed:`)
      this.robot.logger.error(error)
    })
  }

  subscribe () {
    const subscription = this.client.createSubscription()
    subscription.onMessage(message => {
      this.robot.logger.info(JSON.stringify(message, null, 4))
      const post = message.post || message
      if ((message.messageType || message.eventType) === 'PostAdded' && post.text && post.text !== '') {
        const user = new User(post.creatorId, {
          room: post.groupId,
          reply_to: post.groupId,
          name: `User ${post.creatorId} from Group ${post.groupId}`
        })
        const hubotMessage = new TextMessage(user, post.text, 'MSG-' + post.id)
        this.robot.receive(hubotMessage)
      }
    })
    subscription.subscribe(['/glip/posts']).then(subscription => {
      this.robot.logger.info('Subscription created')
    }, e => {
      this.robot.logger.error(e)
    })
  }

  send (envelope, string) {
    this.robot.logger.info('send ' + JSON.stringify(envelope, null, 4) + '\n\n' + string)
    this.client.glip().posts().post({ groupId: envelope.user.reply_to, text: string })
  }

  reply (envelope, string) {
    this.robot.logger.info('reply ' + JSON.stringify(envelope, null, 4) + '\n\n' + string)
    this.client.glip().posts().post({ groupId: envelope.user.reply_to, text: string })
  }

  run () {
    this.robot.logger.info('Run')
    this.login()
  }
}

exports.use = function (robot) {
  return new GlipAdapter(robot)
}
