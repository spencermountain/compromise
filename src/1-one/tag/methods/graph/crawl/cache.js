import byDepth from './crawl.js'

// count children
const cacheDown = root => {
  byDepth(root, (parent, child) => {
    if (parent.id) {
      parent._cache.parents = parent._cache.parents || []
      child._cache.parents = parent._cache.parents.concat([parent.id])
    }
  }, false)
}

// count parents
const cacheUp = root => {
  const nodes = byDepth(root)
  const byId = new Map()
  nodes.forEach(node => {
    node._cache.parents = []
    node._cache.children = []
    if (node.id) {
      byId.set(node.id, node)
    }
  })
  cacheDown(root)
  nodes.forEach(node => {
    node._cache.parents.forEach(id => {
      if (byId.has(id)) {
        byId.get(id)._cache.children.push(node.id)
      }
    })
  })
  root._cache.children = [...byId.keys()]
}
export { cacheDown, cacheUp }
