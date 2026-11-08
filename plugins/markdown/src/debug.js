/* eslint-disable no-console */

const debug = view => {
  const binding = view.document.unist
  if (!binding) {
    console.log('AST: this document has no tree binding')
    return
  }
  // Import order provides stable local IDs, even when debugging a selection.
  const ids = new Map(binding.nodes.map((node, i) => [node, `node-${i + 1}`]))
  const referenced = new Set()
  console.log('AST terms:')
  view.termList().forEach(term => {
    const source = binding.terms.get(term)
    const nodes = [...new Set(source?.parts.map(part => part.node) || [])]
    nodes.forEach(node => referenced.add(node))
    let owners = 'unbound (write-back will fail)'
    if (nodes.length > 0) {
      owners = nodes.map(node => ids.get(node)).join(', ')
    }
    console.log(`  ${JSON.stringify(term.text)} -> ${owners}`)
  })
  console.log('AST text nodes:')
  binding.nodes.forEach(node => {
    if (referenced.has(node)) {
      console.log(`  ${ids.get(node)}: ${JSON.stringify(node.value)}`)
    }
  })
}

export default debug
