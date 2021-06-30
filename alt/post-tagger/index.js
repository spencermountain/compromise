const _model = require('./model')
const _methods = require('./methods')

const postTagger = function (document, world) {
  const { methods, model } = world
  const { compile, bulkMatch, bulkTagger } = methods.postTagger
  let byGroup = compile(model.matches, methods)
  let found = bulkMatch(document, byGroup, methods)
  console.dir(found, { depth: 5 })
  let res = bulkTagger(found, document, world)
  console.dir(res, { depth: 5 })
  return document
}

const plugin = function (world) {
  const { methods, model, parsers } = world
  methods.postTagger = _methods
  Object.assign(model, _model)
  parsers.push(postTagger)
}
module.exports = plugin
