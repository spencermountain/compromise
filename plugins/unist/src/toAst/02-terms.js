const pieces = /\s+|[\p{L}\p{N}\p{M}]+|\p{P}+|[^\s\p{L}\p{N}\p{M}\p{P}]+/gu
const letters = /[\p{L}\p{N}]/u
const punctuation = /^\p{P}/u
const whitespace = /^\s/u
const source = /^(?:https?:\/\/|www\.)\S+$/i

const split = (text, make) =>
  (text.match(pieces) || []).map(value => {
    let type = 'SymbolNode'
    if (whitespace.test(value)) {
      type = 'WhiteSpaceNode'
    } else if (punctuation.test(value)) {
      type = 'PunctuationNode'
    } else if (letters.test(value)) {
      type = 'TextNode'
    }
    return make.literal(type, value)
  })

const terms = (sentence, make, tags) => {
  const nodes = []
  const append = text => {
    split(text, make).forEach(node => {
      if (node.type === 'TextNode') {
        nodes.push(make.parent('WordNode', [node]))
      } else {
        nodes.push(node)
      }
    })
  }
  sentence.forEach(term => {
    append(term.pre)
    // Implicit contraction terms have no written text, but can own whitespace.
    if (term.text) {
      if (source.test(term.text)) {
        nodes.push(make.literal('SourceNode', term.text))
      } else {
        const children = split(term.text, make)
        let run = []
        const flush = () => {
          if (run.length === 0) {
            return
          }
          if (run.some(n => n.type === 'TextNode')) {
            const word = make.parent('WordNode', run)
            if (tags) {
              word.data = { compromise: { tags: Array.from(term.tags) } }
            }
            nodes.push(word)
          } else {
            nodes.push(...run)
          }
          run = []
        }
        children.forEach(node => {
          if (node.type === 'WhiteSpaceNode') {
            flush()
            nodes.push(node)
          } else {
            run.push(node)
          }
        })
        flush()
      }
    }
    append(term.post)
  })
  return nodes
}
export default terms
