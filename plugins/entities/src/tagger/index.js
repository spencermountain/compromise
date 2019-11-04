const organizations = require('./isOrg')
const corrections = require('./corrections')

//some 'deeper' tagging, based on some basic word-knowledge
const inference = function(doc) {
  let termArr = doc.list.map(p => p.terms())
  organizations(doc, termArr)

  // match-tag statements
  corrections(doc)
  return doc
}
module.exports = inference
