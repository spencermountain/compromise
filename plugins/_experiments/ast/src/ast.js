
const chunkType = function (chunk) {
  if (chunk.isVerb().found) {
    return 'verbPhrase'
  }
  if (chunk.isNoun().found) {
    return 'nounPhrase'
  }
  if (chunk.isPivot().found) {
    return 'pivot'
  }
  if (chunk.isAdjective().found) {
    return 'adjectivePhrase'
  }
  return null
}

const doWord = function (w) {
  const term = w.docs[0][0]
  const offset = term.offset
  const node = {
    type: 'word',
    children: [],
    position: {
      start: { line: term.line + 1, column: null, offset: offset.start },
      end: { line: term.line + 1, column: null, offset: offset.start + offset.length }
    }
  }
  if (term.pre) {
    node.children.push({
      type: 'punct', value: term.pre,      // data: { word: false } 
    })
  }
  node.children.push({
    type: 'text', value: term.text, data: { normal: term.normal, tags: Array.from(term.tags) },
    // position: {    }
  })
  if (term.post) {
    node.children.push({
      type: 'punct', value: term.post,      // data: { word: false } 
    })
  }
  return node
}

const doChunk = function (chunk) {
  const type = chunkType(chunk)
  const node = {
    type: type,
    children: chunk.terms().map(doWord),
    // position: {}
  }
  return node
}


const doSentence = function (s) {
  const node = {
    type: 'sentence',
    children: s.chunks().map(doChunk, []),
    position: {}
  }
  return node
}

const toAst = function (doc) {
  doc.compute(['chunks', 'offset', 'lines'])
  const root = {
    type: 'root',
    children: doc.sentences().map(doSentence),
    position: {}
  }
  return root
}
export default toAst