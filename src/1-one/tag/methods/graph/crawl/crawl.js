// [a, a1, b, b1]
// Visitor-only callers can skip collecting nodes.
const byDepth = (root, fn, collect = true) => {
  const list = collect ? [] : null
  const queue = [root]
  for (; queue.length > 0;) {
    // get first
    const node = queue.pop()
    if (collect) {
      list.push(node)
    }
    // add kids to queue
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i -= 1) {
        const child = node.children[i]
        if (fn) {
          fn(node, child)
        }
        queue.push(child)
      }
    }
  }
  return list
}

export default byDepth
