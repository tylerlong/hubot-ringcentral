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
HUBOT_GLIP_APP_KEY=appKey \
HUBOT_GLIP_APP_SECRET=appSecret \
HUBOT_GLIP_USERNAME=username \
HUBOT_GLIP_EXTENSION=extension \
HUBOT_GLIP_PASSWORD=password \
./bin/hubot -a glip
```


## Configuration

This adapter uses the following environment variables:

- `HUBOT_GLIP_APP_KEY` - RingCentral App Key.
- `HUBOT_GLIP_APP_SECRET` - RingCentral App Secret.
- `HUBOT_GLIP_USERNAME` - this is the RingCentral username you would like to run Hubot under.
- `HUBOT_GLIP_EXTENSION` - this is the RingCentral extension you would like to run Hubot under, set it to empty string if `HUBOT_GLIP_USERNAME` is a direct number.
- `HUBOT_GLIP_PASSWORD` - this is the password for the RingCentral user you would like to run Hubot under.
- `HUBOT_GLIP_SERVER` - this is the Glip API server. Optional. By default it's `https://platform.ringcentral.com`.
