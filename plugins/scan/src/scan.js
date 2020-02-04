// follow our trie structure
const scanWords = function(words, trie) {
  let state = 0
  let results = []
  for (let i = 0; i < words.length; i++) {
    let l = words[i]
    while (state > 0 && !(l in trie.gotoFn[state])) {
      state = trie.failure[state]
    }
    if (!(l in trie.gotoFn[state])) {
      continue
    }

    state = trie.gotoFn[state][l]

    if (trie.output[state].length) {
      let foundStrs = trie.output[state]
      // results.push([i, foundStrs])
      results.push(foundStrs)
    }
  }
  return results
}

const scan = function(doc, trie) {
  let results = []
  // do each phrase
  for (let i = 0; i < doc.list.length; i++) {
    let words = Object.keys(doc.list[i].cache.words)
    let found = scanWords(words, trie)
    if (found.length > 0) {
      results = results.concat(found)
    }
  }
  return results
}
module.exports = scan
