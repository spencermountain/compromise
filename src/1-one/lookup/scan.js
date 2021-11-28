// follow our trie structure
const scanWords = function (terms, trie) {
  let state = 0
  let results = []
  for (let i = 0; i < terms.length; i++) {
    let l = terms[i].normal
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
        let obj = arr[o]
        let term = terms[i - obj.len + 1]
        let [n, start] = term.index
        results.push([n, start, start + obj.len])
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
