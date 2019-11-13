const normalize = function(doc) {
  doc = doc.clone()
  // convert 'two' to 2
  doc.numbers().toNumber()
  // remove adverbs
  doc.adverbs().remove()
  return doc
}
module.exports = normalize
