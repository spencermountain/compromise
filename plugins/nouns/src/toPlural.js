const hasPlural = require('./hasPlural')

const toPlural = function(doc) {
  // can it be plural?
  if (hasPlural(doc) === false) {
    return doc
  }
  // convert it
  let transform = doc.world.transforms
  let str = doc.text('normal').trim()
  let plural = transform.nouns(str)
  let phrase = doc.fromText(plural).list[0]
  return doc.replace(phrase, doc)
}
module.exports = toPlural
