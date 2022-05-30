
// simply chunk Nouns as <Noun>
const easyMode = function (document) {
  for (let n = 0; n < document.length; n += 1) {
    for (let t = 0; t < document[n].length; t += 1) {
      let term = document[n][t]
      if (term.tags.has('Verb')) {
        term.chunk = 'Verb'
        continue
      }
      if (term.tags.has('Noun') || term.tags.has('Determiner')) {
        term.chunk = 'Noun'
        continue
      }
      // 100 cats
      if (term.tags.has('Value')) {
        term.chunk = 'Noun'
        continue
      }
      //
      if (term.tags.has('QuestionWord')) {
        term.chunk = 'Pivot'
        continue
      }
      // 'really swimming' vs 'really cool'
      if (term.tags.has('Adverb') || term.tags.has('Negative')) {
        // based on last-term
        let lastT = document[n][t - 1]
        if (lastT && lastT.tags.has('Adjective')) {
          term.chunk = 'Adjective'
          continue
        }
        if (lastT && lastT.tags.has('Verb')) {
          term.chunk = 'Verb'
          continue
        }

        // based on next-term
        let nextT = document[n][t + 1]
        if (nextT && nextT.tags.has('Adjective')) {
          term.chunk = 'Adjective'
          continue
        }
        if (nextT && nextT.tags.has('Verb')) {
          term.chunk = 'Verb'
          continue
        }
      }
    }
  }
}
export default easyMode
