import byDepth from '../crawl/crawl.js'

const toArray = function (json) {
  // The tag formatter only reads these graph-owned nodes.
  const nodes = byDepth(json)
  // should we show the root?
  const root = nodes[0]
  if (root && !root.id && Object.keys(root.props).length === 0) {
    nodes.shift()
  }
  return nodes
}
export default toArray
