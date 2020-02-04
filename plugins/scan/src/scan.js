const scan = function(string, trie) {
  let words = string.split(/ /g)

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
      results.push([i, foundStrs])
    }
  }

  return results
}
module.exports = scan
