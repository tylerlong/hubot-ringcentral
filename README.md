# hubot-glip

[Hubot](https://hubot.github.com/) adapter to use with [Glip](https://glip.com/).


# Upcoming release (Rest API)

The latest version is based on socket.io. And it is the default one if you don't specify explicitly.
We are going to release a new version based on REST API. If you want to try it now, please `yarn add hubot-glip@next`.


## Creating a new bot

- `npm install -g hubot coffee-script yo generator-hubot`
- `mkdir -p /path/to/hubot`
- `cd /path/to/hubot`
- `yo hubot` and enter 'glip' (no quotes) when prompted for the adapter
- Initialize git and make your initial commit
- Check out the [hubot docs](https://github.com/github/hubot/tree/master/docs) for further guidance on how to build your bot


## Testing your bot

- `HUBOT_GLIP_APP_KEY=appKey HUBOT_GLIP_APP_SECRET=appSecret HUBOT_GLIP_USERNAME=your@email.com HUBOT_GLIP_PASSWORD=your-password ./bin/hubot -a glip`


## Configuration

This adapter uses the following environment variables:

- `HUBOT_GLIP_APP_KEY` - RingCentral App Key.
- `HUBOT_GLIP_APP_SECRET` - RingCentral App Secret.
- `HUBOT_GLIP_USERNAME` - this is the email account for the Glip user you would like to run Hubot under.
- `HUBOT_GLIP_PASSWORD` - this is the password for the Glip user you would like to run Hubot under.
- `HUBOT_GLIP_SERVER` - this is the Glip API server. Optional. By default it's `https://platform.ringcentral.com`.
