// simply chunk Nouns as <Noun>
const easyMode = function (document) {
  for (let n = 0; n < document.length; n += 1) {
    for (let t = 0; t < document[n].length; t += 1) {
      let term = document[n][t]
      if (term.tags.has('Verb')) {
        term.chunk = 'Verb'
      } else if (term.tags.has('Noun')) {
        term.chunk = 'Noun'
      }
    }
  }
}
export default easyMode
