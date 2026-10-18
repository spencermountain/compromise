const validate = function (node) {
  node.children = node.children || []
  node._cache = node._cache || {}
  node.props = node.props || {}
  node._cache.parents = node._cache.parents || []
  return node
}
export default validate
