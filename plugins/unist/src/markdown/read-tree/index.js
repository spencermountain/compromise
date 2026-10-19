import walk from './01-walk.js'
import connectNodes from './02-connect.js'

const readTree = function (tree, nlp, options = {}) {
  // Snapshot read options so later caller changes cannot alter write-back traversal.
  const readOptions = { ...options }
  const { nodes, groups } = walk(tree, readOptions)
  const doc = nlp.tokenize('')
  const binding = {
    tree,
    readOptions,
    nodes,
    groups,
    layout: new Map(),
    terms: new WeakMap(),
    values: nodes.map(node => node.value),
  }
  groups.forEach(group => {
    // Tokenize a whole prose run so inline markup cannot split words or matches.
    const part = nlp.tokenize(group.map(node => node.value).join(''))
    connectNodes(part, group, binding)
    if (part.document.length) {
      // Readable plaintext separation only; write-back retains original AST separators.
      if (doc.document.length) {
        doc.document.at(-1).at(-1).post += '\n\n'
      }
      part.document.forEach(sentence => doc.document.push(sentence))
    }
  })
  // One shared document owns all bindings, including those reached through selections.
  Object.defineProperty(doc.document, 'unist', { value: binding })
  doc.compute(nlp.hooks())
  return doc
}

export default readTree
