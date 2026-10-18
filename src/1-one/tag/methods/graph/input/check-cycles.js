// Iterative DFS keeps deep inputs safe and distinguishes shared nodes from cycles.
const checkCycles = roots => {
  const states = new Map()
  const stack = roots.map(node => [node, false])
  for (; stack.length > 0;) {
    const [node, done] = stack.pop()
    if (done) {
      states.set(node, 2)
    } else if (states.get(node) === 1) {
      throw new Error('[Grad] - cyclic input')
    } else if (!states.has(node)) {
      states.set(node, 1)
      stack.push([node, true])
      for (const child of node.children || []) {
        stack.push([child, false])
      }
    }
  }
  return states.keys()
}

export default checkCycles
