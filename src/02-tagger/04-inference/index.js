const organizations = require('./02-organizations')
const acronyms = require('./01-acronyms')

//some 'deeper' tagging, based on some basic word-knowledge
const inference = function(doc) {
  let termArr = doc.list.map(p => p.terms())
  acronyms(doc, termArr)
  organizations(doc, termArr)
  return doc
}
module.exports = inference
