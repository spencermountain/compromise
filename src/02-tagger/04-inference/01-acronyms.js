/** if each letter represents a whole word */
const tagAcronyms = function(doc, termArr) {
  termArr.forEach(terms => {
    terms.forEach(t => {
      if (t.isAcronym()) {
        t.tagSafe('Acronym', 'acronym-step', doc.world)
        t.tagSafe('Noun', 'acronym-infer', doc.world)
      }
    })
  })
  return doc
}
module.exports = tagAcronyms
