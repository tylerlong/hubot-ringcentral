# hubot-glip

[Hubot](https://hubot.github.com/) adapter to use with [Glip](https://glip.com/).


## Getting Started

#### Creating a new bot

- `npm install -g hubot coffee-script yo generator-hubot`
- `mkdir -p /path/to/hubot`
- `cd /path/to/hubot`
- `yo hubot` and enter 'glip' (no quotes) when [prompted for the adapter, or set everything with the option flags](https://hubot.github.com/docs/)
- Initialize git and make your initial commit
- Check out the [hubot docs](https://github.com/github/hubot/tree/master/docs) for further guidance on how to build your bot

#### Testing your bot locally

- `HUBOT_GLIP_EMAIL=you@email.com HUBOT_GLIP_PASSWORD=your-password ./bin/hubot -a glip`

#### Deploying to Heroku

This is a modified set of instructions based on the [instructions on the Hubot wiki](https://github.com/github/hubot/blob/master/docs/deploying/heroku.md).

- Follow the instructions above to create a hubot locally

- Install [heroku toolbelt](https://toolbelt.heroku.com/) if you haven't already.
- `heroku create my-company-glipbot`
- `heroku addons:create rediscloud:30`
- Add the [config variables](#configuration). For example:

        % heroku config:add HUBOT_GLIP_EMAIL=you@email.com
        % heroku config:add HUBOT_GLIP_PASSWORD=your-password

- Deploy the bot:

        % git push heroku master

- Profit!


## Configuration

This adapter uses the following environment variables:

- `HUBOT_GLIP_EMAIL` - this is the email account for the Glip user you would like to run Hubot under.
- `HUBOT_GLIP_PASSWORD` - this is the password for the Glip user you would like to run Hubot under.
