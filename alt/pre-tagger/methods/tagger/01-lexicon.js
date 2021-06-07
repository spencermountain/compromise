// tag any words in our lexicon
const checkLexicon = function (terms, model) {
  terms.forEach(t => {
    if (model.lexicon[t.normal] !== undefined && model.lexicon.hasOwnProperty(t.normal)) {
      let tag = model.lexicon[t.normal]
      t.tags = t.tags || new Set()
      t.tags.add(tag)
    }
  })
}
module.exports = checkLexicon
