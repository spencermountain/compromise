const organizations = require('./01-organizations')

//some 'deeper' tagging, based on some basic word-knowledge
const inference = function(doc) {
  let termArr = doc.list.map(p => p.terms())
  organizations(doc, termArr)
  return doc
}
module.exports = inference
