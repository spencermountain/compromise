const fastTagger = function (doc, matches) {
  doc.cache()
  console.log(doc._cache)
  return doc
}
module.exports = fastTagger
