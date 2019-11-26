const normalize = function(doc) {
  doc = doc.clone()

  if (!doc.numbers) {
    console.warn("Compromise: compromise-dates cannot find plugin dependency 'compromise-number'")
  } else {
    // convert 'two' to 2
    let num = doc.numbers()
    num.toNumber()
    num.toCardinal()
  }
  // remove adverbs
  doc.adverbs().remove()
  return doc
}
module.exports = normalize
