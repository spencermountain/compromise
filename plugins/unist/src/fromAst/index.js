import read from './01-read.js'

const fromAst = function (tree, options = {}) {
  const document = read(tree, options.tags !== false)
  const doc = this('')
  doc.document = document
  // Initialize matching metadata without tagger or contraction hooks.
  doc.compute(['normal', 'index', 'id'])
  return doc
}
export default fromAst
