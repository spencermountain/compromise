import read from './01-read.js'
import applyTags from './02-tags.js'

const fromAst = function (tree, options = {}) {
  const { text, spans } = read(tree, options.tags !== false)
  console.log(spans)
  const doc = this(text)
  applyTags(doc, spans)
  return doc
}
export default fromAst
