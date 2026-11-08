import collect from '../read-tree/01-walk.js'

const update = doc => {
  const unist = doc.document.unist
  if (!unist) {
    throw new Error('This document is not connected to a Markdown tree')
  }
  const { tree, nodes, values, layout, terms } = unist
  const { nodes: current, groups } = collect(tree, unist.readOptions)
  // Generated wrappers are recreated during traversal, so compare their values.
  const sameNode = (node, previous) => node === previous ||
    (node.generated === true && previous?.generated === true && node.value === previous.value)
  // Moving text across block boundaries also invalidates the imported structure.
  const sameGroups = groups.length === unist.groups.length && groups.every((group, i) =>
    group.length === unist.groups[i].length && group.every((node, j) => sameNode(node, unist.groups[i][j])))
  if (!sameGroups || current.length !== nodes.length || current.some((node, i) => !sameNode(node, nodes[i]) || node.value !== values[i])) {
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
  const present = new Set(allTerms)
  // Internal and unalignable terms may pass through, but must remain untouched.
  unist.protectedTerms.forEach((original, term) => {
    if (!present.has(term) || term.text !== original.text || term.implicit !== original.implicit) {
      throw new Error('Cannot update tree: an implicit or unalignable term was edited')
    }
  })
  const visible = allTerms.filter(term => !unist.protectedTerms.has(term) || terms.get(term)?.parts.length)
  const words = new Map()
  visible.forEach((term, i) => {
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
  if (visible.length !== expected.length) {
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
  // Generated Markdown is read-only: edits must not leak syntax into source nodes.
  if (nodes.some((node, i) => node.generated && output[i] !== values[i])) {
    throw new Error('Cannot update tree: generated Markdown syntax was edited')
  }
  // No AST mutation happens until every word has passed validation.
  nodes.forEach((node, i) => {
    if (!node.generated) {
      node.value = output[i]
    }
  })
  unist.values = output
  return doc
}

export default update
