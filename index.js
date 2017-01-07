const GlipAdapter = require('./src/adapter')

exports.use = function (robot) {
  return new GlipAdapter(robot)
}
