# hubot-glip

[Hubot](https://hubot.github.com/) adapter to use with [Glip](https://glip.com/).


## Creating a new bot

- `npm install -g hubot coffee-script yo generator-hubot`
- `mkdir -p /path/to/hubot`
- `cd /path/to/hubot`
- `yo hubot` and enter 'glip' (no quotes) when prompted for the adapter
- Initialize git and make your initial commit
- Check out the [hubot docs](https://github.com/github/hubot/tree/master/docs) for further guidance on how to build your bot


## Testing your bot

```
HUBOT_GLIP_SERVER=https://platform.devtest.ringcentral.com \
HUBOT_GLIP_APP_KEY=appKey \
HUBOT_GLIP_APP_SECRET=appSecret \
HUBOT_GLIP_BOT_SERVER=https://the-bot-server \
./bin/hubot -a glip
```


## Configuration

This adapter uses the following environment variables:

- `HUBOT_GLIP_APP_KEY` - RingCentral App Key.
- `HUBOT_GLIP_APP_SECRET` - RingCentral App Secret.
- `HUBOT_GLIP_SERVER` - This is the Glip API server. Optional. By default it's `https://platform.ringcentral.com`. Use `https://platform.devtest.ringcentral.com` for sandbox
- `HUBOT_GLIP_BOT_SERVER` - The server that your bot is running on.


## Demo bot

https://github.com/tylerlong/glip-hubot-t

You can simply fork it, clone it and write your own code based on it.


## Note

When you create the app on RingCentral. You need to set the OAuth Redirect URI to `${HUBOT_GLIP_BOT_SERVER}/oauth`.

For example, if your bot is running on local with ngrok url `https://xxxxx.ngrok.io`, you should set the OAuth Redirect URI to `https://xxxxx.ngrok.io/oauth`.
