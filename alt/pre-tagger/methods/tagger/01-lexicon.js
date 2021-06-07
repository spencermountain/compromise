// tag any words in our lexicon
const checkLexicon = function (terms, model) {
  terms.forEach(t => {
    if (model.lexicon[t.normal] !== undefined && model.lexicon.hasOwnProperty(t.normal)) {
      let tag = model.lexicon[t.normal]
      t.tags = t.tags || new Set()
      if (typeof tag === 'string') {
        t.tags.add(tag)
      } else {
        tag.forEach(tg => t.tags.add(tg))
      }
    }
    // look at implied words in contractions
    if (t.implicit !== undefined) {
      if (model.lexicon[t.implicit] !== undefined && model.lexicon.hasOwnProperty(t.implicit)) {
        let tag = model.lexicon[t.implicit]
        t.tags = t.tags || new Set()
        if (typeof tag === 'string') {
          t.tags.add(tag)
        } else {
          tag.forEach(tg => t.tags.add(tg))
        }
      }
    }
  })
}
module.exports = checkLexicon
