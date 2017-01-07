# hubot-glip

[Hubot](https://hubot.github.com/) adapter to use with [Glip](https://glip.com/).


# Prerelease version

The latest version is based on socket.io. And it is the default one if you don't specify explicitly.

We also have a [prerelease version](https://github.com/tylerlong/hubot-glip/tree/2.0) based on REST API.


## Creating a new bot

- `npm install -g hubot coffee-script yo generator-hubot`
- `mkdir -p /path/to/hubot`
- `cd /path/to/hubot`
- `yo hubot` and enter 'glip' (no quotes) when prompted for the adapter
- Initialize git and make your initial commit
- Check out the [hubot docs](https://github.com/github/hubot/tree/master/docs) for further guidance on how to build your bot


## Testing your bot

```
HUBOT_GLIP_EMAIL=your@email.com \
HUBOT_GLIP_PASSWORD=your-password \
./bin/hubot -a glip
```


## Configuration

This adapter uses the following environment variables:

- `HUBOT_GLIP_EMAIL` - this is the email account for the Glip user you would like to run Hubot under.
- `HUBOT_GLIP_PASSWORD` - this is the password for the Glip user you would like to run Hubot under.
- `HUBOT_GLIP_HOST` - this is the Glip host. Optional. By default it's `glip.com`. For QA it's `glipqa.com`.
- `HUBOT_GLIP_PORT` - this is the Glip port. Optional. By default it's 443.
