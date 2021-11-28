// follow our trie structure
const scanWords = function (terms, trie) {
  let n = 0
  let results = []
  for (let i = 0; i < terms.length; i++) {
    let word = terms[i].normal
    // main match-logic loop:
    while (n > 0 && !trie.goNext[n].hasOwnProperty(word)) {
      n = trie.failTo[n] || 0 // (usually back to 0)
    }
    // did we fail?
    if (!trie.goNext[n].hasOwnProperty(word)) {
      continue
    }
    n = trie.goNext[n][word]
    if (trie.endAs[n]) {
      let arr = trie.endAs[n]
      for (let o = 0; o < arr.length; o++) {
        let len = arr[o]
        let term = terms[i - len + 1]
        let [n, start] = term.index
        results.push([n, start, start + len])
      }
    }
  }
  return results
}

const scan = function (view, trie) {
  let results = []
  let docs = view.docs
  // do each phrase
  for (let i = 0; i < docs.length; i++) {
    let terms = docs[i]
    let found = scanWords(terms, trie)
    if (found.length > 0) {
      results = results.concat(found)
    }
  }
  return view.update(results)
}
export default scan
