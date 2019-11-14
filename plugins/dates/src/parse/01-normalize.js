const normalize = function(doc) {
  doc = doc.clone()

  if (!doc.numbers) {
    console.warn("Compromise: compromise-dates cannot find plugin dependency 'compromise-number'")
  } else {
    // convert 'two' to 2
    doc.numbers().toNumber()
  }
  // remove adverbs
  doc.adverbs().remove()
  return doc
}
module.exports = normalize
