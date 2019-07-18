//
const tagAcronyms = function(doc, termArr, world) {
  termArr.forEach(terms => {
    terms.forEach(t => {
      if (t.isAcronym()) {
        t.tag(['Acronym', 'Noun'], 'acronym-step', world)
      }
    })
  })
  return doc
}
module.exports = tagAcronyms
