const hasPlural = require('./hasPlural')

const toPlural = function(doc) {
  // can it be plural?
  if (doc.has('#Plural') === true || hasPlural(doc) === false) {
    return doc
  }
  // convert it
  let transform = doc.world.transforms
  let str = doc.text('normal').trim()
  let plural = transform.toPlural(str)
  return doc.replaceWith(plural)
}
module.exports = toPlural
