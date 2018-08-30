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
RINGCENTRAL_CLIENT_ID=appKey \
RINGCENTRAL_CLIENT_SECRET=appSecret \
RINGCENTRAL_BOT_SERVER=https://the-bot-server \
./bin/hubot -a glip
```


## Configuration

This adapter uses the following environment variables:

- `RINGCENTRAL_CLIENT_ID` - RingCentral App Key.
- `RINGCENTRAL_CLIENT_SECRET` - RingCentral App Secret.
- `RINGCENTRAL_SERVER` - This is the Glip API server. Optional. By default it's `https://platform.ringcentral.com`. Use `https://platform.devtest.ringcentral.com` for sandbox
- `RINGCENTRAL_BOT_SERVER` - The server that your bot is running on. If you use ngork for development, the uri should be `https://xxxxx.ngrok.io`.


## Note

When you create the app on RingCentral. You need to set the OAuth Redirect URI to `${RINGCENTRAL_BOT_SERVER}/oauth`.

For example, if your bot is running on local with ngrok uri `https://xxxxx.ngrok.io`, you should set the OAuth Redirect URI to `https://xxxxx.ngrok.io/oauth`.
