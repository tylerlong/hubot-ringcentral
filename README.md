# hubot-glip

[Hubot](https://hubot.github.com/) adapter to use with [Glip](https://glip.com/).


## Creating a new bot

- `npm install -g hubot coffeescript yo generator-hubot`
- `mkdir -p /path/to/hubot`
- `cd /path/to/hubot`
- `yo hubot` and enter 'glip' (no quotes) when prompted for the adapter
- Initialize git and make your initial commit
- Check out the [hubot docs](https://github.com/github/hubot/tree/master/docs) for further guidance on how to build your bot


## Testing your bot

```
RINGCENTRAL_SERVER=https://platform.devtest.ringcentral.com \
RINGCENTRAL_CLIENT_ID=clientId \
RINGCENTRAL_CLIENT_SECRET=clientSecret \
RINGCENTRAL_BOT_SERVER=https://the-bot-server \
./bin/hubot -a glip
```

Note: `RINGCENTRAL_BOT_SERVER` is only required for public bot.


## Configuration

This adapter uses the following environment variables:

- `RINGCENTRAL_CLIENT_ID` - RingCentral Client ID.
- `RINGCENTRAL_CLIENT_SECRET` - RingCentral Client Secret.
- `RINGCENTRAL_SERVER` - This is the Glip API server. Optional. By default it's `https://platform.ringcentral.com`. Use `https://platform.devtest.ringcentral.com` for sandbox
- `RINGCENTRAL_BOT_SERVER` - The server that your bot is running on. If you use ngork for development, the uri should be `https://xxxxx.ngrok.io`.

Note: `RINGCENTRAL_BOT_SERVER` is only required for public bot.


## Note

If you bot is a private bot, you can simply use the default OAuth Redirect URI: `https://www.ringcentral.com`.

If you bot is a public bot, You need to set the OAuth Redirect URI to `${RINGCENTRAL_BOT_SERVER}/oauth`.

For example, if your bot is running on local with ngrok uri `https://xxxxx.ngrok.io`, you should set the OAuth Redirect URI to `https://xxxxx.ngrok.io/oauth`.
