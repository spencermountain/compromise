
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
  let term = w.docs[0][0]
  let offset = term.offset
  let node = {
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
  let type = chunkType(chunk)
  let node = {
    type: type,
    children: chunk.terms().map(doWord),
    // position: {}
  }
  return node
}


const doSentence = function (s) {
  let node = {
    type: 'sentence',
    children: s.chunks().map(doChunk, []),
    position: {}
  }
  return node
}

const toAst = function (doc) {
  doc.compute(['chunks', 'offset', 'lines'])
  let root = {
    type: 'root',
    children: doc.sentences().map(doSentence),
    position: {}
  }
  return root
}
export default toAst