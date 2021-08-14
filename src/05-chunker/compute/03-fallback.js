// ensure everything has a chunk
const fallback = function (document) {
  for (let n = 0; n < document.length; n += 1) {
    for (let t = 0; t < document[n].length; t += 1) {
      let term = document[n][t]
      if (term.chunk === undefined) {
        console.log('?', term.normal)
        // conjunctions stand alone
        if (term.tags.has('Conjunction')) {
          term.chunk = 'Conjunction'
        } else if (term.tags.has('Preposition')) {
          term.chunk = 'Conjunction'
        }
        // just take the chunk on the right?
        else if (document[n][t + 1]) {
          term.chunk = document[n][t + 1].chunk
        }
        // or take the chunk on the left
        else if (document[n][t - 1]) {
          term.chunk = document[n][t - 1].chunk
        } else {
          //  ¯\_(ツ)_/¯
          term.chunk = 'Noun'
        }
      }
    }
  }
}
export default fallback
