const organizations = require('./01-organizations')
const people = require('./02-people')

//some 'deeper' tagging, based on some basic word-knowledge
const inference = function(doc) {
  let termArr = doc.list.map(p => p.terms())
  organizations(doc, termArr)
  people(doc, termArr)
  return doc
}
module.exports = inference
