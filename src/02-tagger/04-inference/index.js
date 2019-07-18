const organizations = require('./organizations')
const acronyms = require('./acronyms')

//some 'deeper' tagging, based on some basic word-knowledge
const inference = function(doc) {
  let world = doc.world
  let termArr = doc.list.map(p => p.terms())
  acronyms(doc, termArr, world)
  organizations(doc, termArr, world)
  return doc
}
module.exports = inference
