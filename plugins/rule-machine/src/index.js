const compile = require('./compile')

const plugin = function (Doc, world, nlp) {
  world.compileRules = function (rules) {
    let graph = compile(rules)
  }
}
module.exports = plugin
