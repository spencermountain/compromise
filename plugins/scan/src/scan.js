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
        let obj = arr[o]
        let start = terms[i - obj.len + 1]
        results.push({ id: start.id, len: obj.len, value: obj.value })
      }
    }
  }
  return results
}

const scan = function(doc, trie) {
  let results = []
  // do each phrase
  for (let i = 0; i < doc.list.length; i++) {
    let words = doc.list[i].terms() || []
    let found = scanWords(words, trie)
    if (found.length > 0) {
      results = results.concat(found)
    }
  }
  let byVal = {}
  let p = doc.list[0]
  results.forEach(obj => {
    byVal[obj.value] = byVal[obj.value] || []
    byVal[obj.value].push(p.buildFrom(obj.id, obj.len))
  })
  Object.keys(byVal).forEach(k => {
    byVal[k] = doc.buildFrom(byVal[k])
  })
  // return object-format
  if (trie.isObj === true) {
    return byVal
  }
  // return array format
  return byVal[true] || []
}
module.exports = scan
