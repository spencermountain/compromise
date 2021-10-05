// get all character startings in doc
const offset = function (_docs, _a, b) {
  let elapsed = 0
  let index = 0
  let docs = b.document //start from the actual-top
  for (let i = 0; i < docs.length; i += 1) {
    for (let t = 0; t < docs[i].length; t += 1) {
      let term = docs[i][t]
      term.offset = {
        index: index,
        start: elapsed + term.pre.length,
        length: term.text.length,
      }
      elapsed += term.pre.length + term.text.length + term.post.length
      index += 1
    }
  }
}

// cheat- add the document's pointer to the terms
const index = function (docs, _a, b) {
  let ptrs = b.fullPointer
  for (let i = 0; i < docs.length; i += 1) {
    const [n, start] = ptrs[i]
    for (let t = 0; t < docs[i].length; t += 1) {
      let term = docs[i][t]
      term.index = [n, start + t]
    }
  }
}

export { offset, index }
