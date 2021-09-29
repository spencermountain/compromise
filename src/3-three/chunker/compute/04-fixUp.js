const fixUp = function (docs) {
  docs.forEach(terms => {
    // ensure an adjective chunk is preceded by a copula
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]
      if (term.tags.has('#Copula')) {
        return
      }
      if (term.chunk === 'Adjective') {
        term.chunk = 'Noun'
        // console.log(`✗ ${term.normal}`)
      }
    }
  })
}
export default fixUp
