# hubot-glip

[Hubot](https://hubot.github.com/) adapter to use with [Glip](https://glip.com/).


## Video tutorials

- [How to createa a RingCentral private bot using Hubot](https://youtu.be/rEmd7SIDNe4)
- [How to create a RingCentral public bot using Hubot](https://youtu.be/al-RoNSdfO8)


## Create a new bot

Create new project with the following structure:

```
your-bot/
    scripts/
    external-scripts.json
```

In the root of your bot project, execute:

```
yarn add hubot@2.19.0 hubot-glip && yarn add --dev babel-polyfill
```


## Add external scripts

Take [hubot-help](https://www.npmjs.com/package/hubot-help) for example:

```
yarn add hubot-help
```

Then config it to `external-scripts.json`:

```json
[
    "hubot-help"
]
```


## Add custom scripts

Let's assume that we want to add `ping` feature to the bot.

Creat `scripts/ping.js` file with the following content:

```js
// Commands:
//   hubot ping - ping the bot
module.exports = robot => {
  robot.respond(/ping$/, res => {
    res.send('pong')
  })
}
```


## Get RingCentral access_token

This step is different for provate bot and public bot.

### Private bot

If you bot is a private bot, you can simply use the default OAuth Redirect URI: `https://www.ringcentral.com`.
And you can get the token from GUI of https://developer.ringcentral.com.
Create `token.json` in the root of your bot project with the following content:

```json
{
    "access_token": "the-access-token-string"
}
```

### Public bot

If you bot is a public bot, You need to set the OAuth Redirect URI to `${RINGCENTRAL_BOT_SERVER}/oauth`.

For example, if your bot is running on local with ngrok uri `https://xxxxx.ngrok.io`, you should set the OAuth Redirect URI to `https://xxxxx.ngrok.io/oauth`.

When you successfully add the bot to Glip, a `token.json` file will be created for you automatically.


## Run your bot

```
RINGCENTRAL_SERVER=https://platform.devtest.ringcentral.com \
RINGCENTRAL_CLIENT_ID=clientId \
RINGCENTRAL_CLIENT_SECRET=clientSecret \
RINGCENTRAL_BOT_SERVER=https://the-bot-server \
npx hubot -a glip -n x
```

- `RINGCENTRAL_SERVER` - This is the Glip API server. Optional. By default it's `https://platform.ringcentral.com`. Use `https://platform.devtest.ringcentral.com` for sandbox
- `RINGCENTRAL_BOT_SERVER` - **Optional**. The server that your bot is running on. If you use ngork for development, the uri should be `https://xxxxx.ngrok.io`. It is **only required** for public bot and when you do not have a RingCentral access token. Ignore this environment variable if your bot is a private bot or if you already have a RingCentral access token.
- `-n x` means the name of your bot is `x`. You can use any name


## Test your bot

For production login https://app.glip.com, for sandbox login https://glip-app.devtest.ringcentral.com/

Find your bot in Glip and talk to it:


```
Send: x ping
Receive: pong
Send: x help
Receive: xping - ping the bot
```

Example above assume that your bot's name is `x` and you have installed exernal script `hubot-help` and added custom script `ping`. For more details about them please read content above.
