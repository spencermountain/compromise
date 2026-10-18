import byDepth from './crawl.js'

// Fresh graph nodes already have empty caches; fill ancestors in root-to-parent order.
const cacheParents = root => {
  byDepth(root, (parent, child) => {
    if (parent.id) {
      child._cache.parents = parent._cache.parents.concat([parent.id])
    }
  }, false)
}

export default cacheParents
