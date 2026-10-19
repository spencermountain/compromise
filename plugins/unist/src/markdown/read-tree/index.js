import walk from './01-walk.js'
import connectNodes from './02-connect.js'

const readTree = function (tree, nlp) {
  if (tree.type === 'root' && tree.children.length > 1) {
    throw new Error('The Markdown proof of concept supports one prose block')
  }
  const nodes = walk(tree)
  // Join before tokenizing so inline markup cannot split a word or a match.
  const doc = nlp.tokenize(nodes.map(node => node.value).join(''))
  // Establish source ownership before running the full tagging pipeline.
  const { layout, terms } = connectNodes(doc, nodes)
  // Selections share this array. Cloning copies its sentences, not this metadata.
  Object.defineProperty(doc.document, 'unist', {
    value: {
      tree,
      nodes,
      layout,
      terms,
      values: nodes.map(node => node.value),
    },
  })
  doc.compute(nlp.hooks())
  return doc
}

export default readTree
