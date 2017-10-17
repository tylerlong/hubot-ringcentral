import RingCentral, { SERVER_PRODUCTION } from 'ringcentral-ts'
import FileTotkenStorage from 'ringcentral-ts/FileTokenStore'
import pkg from '../package.json'

const tokenStore = new FileTotkenStorage('./tokenStore.json')

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
      tokenStore,
      server: process.env.HUBOT_GLIP_SERVER || SERVER_PRODUCTION,
      appKey: process.env.HUBOT_GLIP_APP_KEY,
      appSecret: process.env.HUBOT_GLIP_APP_SECRET
    })
    this.client.agents.push(`${pkg.name}/${pkg.version}`)

    this.client.getToken().then(() => {
      this.robot.logger.info('Token restored from file')
      this._subscribe()
    }).catch((e) => {
      this.robot.logger.error('No saved token detected. You need to add the bot to Glip first.')
    })

    this.robot.router.get('/oauth', (req, res) => {
      if (!req.query.code) {
        res.status(500)
        res.send({ 'Error': "Looks like we're not getting code." })
        this.robot.logger.error('Looks like we are not getting code.')
        return
      }
      this.robot.logger.info(req.query.code)
      this.client.oauth(req.query.code, `${process.env.HUBOT_GLIP_BOT_SERVER}/oauth`).then(() => {
        res.status(200)
        res.send('success')
        this.robot.logger.info('oauth is successful')
        this._subscribe()
      }).catch(e => {
        res.status(500)
        res.send(e.message)
        this.robot.logger.error(e)
      })
    })
  }

  _subscribe () {
    this.emit('connected')
    const subscription = this.client.createSubscription()
    subscription.onMessage(message => {
      this.robot.logger.info(JSON.stringify(message, null, 4))
      const post = message.body
      if (post.eventType === 'PostAdded' && post.text && post.text !== '') {
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

  subscribe () {

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
  }
}

exports.use = function (robot) {
  return new GlipAdapter(robot)
}
