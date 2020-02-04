// follow our trie structure
const scanWords = function(terms, trie) {
  let state = 0
  let results = []
  for (let i = 0; i < terms.length; i++) {
    let l = terms[i].reduced
    if (trie.gotoFn[state] === undefined) {
      trie.gotoFn[state] = []
    }
    while (state > 0 && !(l in trie.gotoFn[state])) {
      state = trie.failure[state]
    }
    if (!(l in trie.gotoFn[state])) {
      continue
    }

    state = trie.gotoFn[state][l]
    if (trie.output[state] !== undefined) {
      let arr = trie.output[state]
      for (let o = 0; o < arr.length; o++) {
        let len = arr[o]
        results.push([terms[i - len + 1].id, len])
      }
    }
  }
  return results
}

const scan = function(doc, trie) {
  let results = []
  // do each phrase
  for (let i = 0; i < doc.list.length; i++) {
    let words = doc.list[i].cache.terms
    let found = scanWords(words, trie)
    if (found.length > 0) {
      results = results.concat(found)
    }
  }
  // return results
  let p = doc.list[0]
  let phrases = results.map(a => {
    return p.buildFrom(a[0], a[1])
  })
  return doc.buildFrom(phrases)
}
module.exports = scan
