import byDepth from './crawl.js'

// Cache each tag's ancestors in root-to-parent order.
const cacheDown = root => {
  byDepth(root, (parent, child) => {
    if (parent.id) {
      parent._cache.parents = parent._cache.parents || []
      child._cache.parents = parent._cache.parents.concat([parent.id])
    }
  }, false)
}

const cacheParents = root => {
  const nodes = byDepth(root)
  nodes.forEach(node => {
    node._cache.parents = []
  })
  cacheDown(root)
}

export default cacheParents
