// [a, b, a1, b1]
const breadthFirst = (root, fn) => {
  let list = []
  let queue = [root]
  while (queue.length > 0) {
    // get first
    let node = queue.shift()
    if (fn) {
      fn(node)
    }
    // add to list
    list.push(node)
    // add kids to queue
    if (node.children) {
      node.children.forEach(n => {
        // n._cache.parents = node._cache.parents + 1
        queue.push(n)
      })
    }
  }
  return list
}


// [a, a1, b, b1]
const depthFirst = (root, fn) => {
  let list = []
  let queue = [root]
  while (queue.length > 0) {
    // get first
    let node = queue.pop()
    // add to list
    list.push(node)
    // add kids to queue
    if (node.children) {
      node.children.forEach(child => {
        queue.push(child)
        if (fn) {
          fn(child)
        }
      })
    }
  }
  return list
}

export { depthFirst, breadthFirst }