import { documents, terms, fields } from './_bindings.js'
import collect from './_tree.js'

const getBinding = doc => {
  const binding = documents.get(doc.document)
  if (!binding) {
    throw new Error('This document is not connected to a Markdown tree')
  }
  return binding
}

const update = doc => {
  const binding = getBinding(doc)
  const { tree, nodes, values } = binding
  // Refuse to overwrite text nodes that another consumer changed or replaced.
  const current = collect(tree)
  if (current.length !== nodes.length || current.some((node, i) => node !== nodes[i] || node.value !== values[i])) {
    throw new Error('Markdown tree changed since import or last update')
  }
  // Stage complete node values separately; deleted terms contribute no text.
  const output = new Map(nodes.map(node => [node, '']))
  let lastIndex = -1
  const order = new Map(nodes.map((node, i) => [node, i]))
  const append = (node, text) => {
    if (!text) {
      return
    }
    // Writing backwards would require moving AST structure, which we do not support.
    if (!output.has(node) || order.get(node) < lastIndex) {
      throw new Error('Cannot write reordered text back to Markdown nodes')
    }
    lastIndex = order.get(node)
    output.set(node, output.get(node) + text)
  }
  // Always validate the complete document before mutating any node.
  doc.document.forEach(sentence => sentence.forEach(term => {
    const source = terms.get(term)
    if (!source) {
      throw new Error('Cannot update tree: inserted or replaced text has ambiguous ownership')
    }
    fields.forEach(field => {
      const parts = source[field]
      const value = term[field]
      // Unchanged fields preserve their exact distribution across source nodes.
      if (value === parts.map(part => part.text).join('')) {
        parts.forEach(part => append(part.node, part.text))
      } else {
        // A changed field is writable only when its destination is unambiguous.
        const owners = new Set(parts.map(part => part.node))
        if (!value) {
          return
        }
        if (owners.size !== 1) {
          throw new Error('Cannot update tree: edited text crosses Markdown nodes')
        }
        append([...owners][0], value)
      }
    })
  }))
  // Commit only after every field passes validation, then refresh conflict detection.
  nodes.forEach(node => node.value = output.get(node))
  binding.values = nodes.map(node => node.value)
  return doc
}

export { getBinding, update }
