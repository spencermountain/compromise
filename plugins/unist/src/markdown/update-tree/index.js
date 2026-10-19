import collect from '../read-tree/01-walk.js'

const update = doc => {
  const unist = doc.document.unist
  if (!unist) {
    throw new Error('This document is not connected to a Markdown tree')
  }
  const { tree, nodes, values, layout, terms } = unist
  const current = collect(tree)
  if (current.length !== nodes.length || current.some((node, i) => node !== nodes[i] || node.value !== values[i])) {
    throw new Error('Markdown tree changed since import or last update')
  }
  // Slots describe word order independently of compromise's pre/post storage.
  const expected = [
    ...new Set(
      nodes.flatMap(node =>
        layout
          .get(node)
          .filter(entry => typeof entry !== 'string')
          .map(part => part.source)
      )
    ),
  ]
  const allTerms = doc.document.flat()
  const words = new Map()
  allTerms.forEach((term, i) => {
    const source = terms.get(term)
    if (!source) {
      throw new Error('Cannot update tree: inserted or replaced text has ambiguous ownership')
    }
    if (source !== expected[i]) {
      throw new Error('Cannot update tree: deleted or reordered words require structural editing')
    }
    const original = source.parts.map(part => part.text).join('')
    if (source.parts.length > 1 && term.text !== original) {
      throw new Error('Cannot update tree: edited text crosses Markdown nodes')
    }
    words.set(source, term.text)
  })
  if (allTerms.length !== expected.length) {
    throw new Error('Cannot update tree: deleted words require structural editing')
  }
  // Literal separators stay as imported; punctuation-only edits are deliberately ignored.
  const output = nodes.map(node =>
    layout
      .get(node)
      .map(entry => {
        if (typeof entry === 'string') {
          return entry
        }
        if (entry.source.parts.length > 1) {
          return entry.text
        }
        return words.get(entry.source)
      })
      .join('')
  )
  // No AST mutation happens until every word has passed validation.
  nodes.forEach((node, i) => (node.value = output[i]))
  unist.values = output
  return doc
}

export default update
