//  ¯\_(ツ)_/¯
const nounFallback = function (terms) {
  terms.forEach(term => {
    if (term.tags.size === 0) {
      term.tags.add('Noun')
    }
  })
}
module.exports = nounFallback
