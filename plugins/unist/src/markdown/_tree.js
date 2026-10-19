// Keep inline descendants together; reject unsupported non-prose content for now.
const containers = new Set(['root', 'paragraph', 'heading', 'strong', 'emphasis', 'link', 'linkReference'])

const collect = tree => {
  const nodes = []
  // An explicit stack avoids recursion limits in deeply nested inline markup.
  const stack = [tree]
  for (; stack.length > 0;) {
    const node = stack.pop()
    if (node.type === 'text') {
      nodes.push(node)
    } else if (containers.has(node.type) && node.children) {
      // Push in reverse so popping visits text in reading order.
      for (let i = node.children.length - 1; i >= 0; i -= 1) {
        stack.push(node.children[i])
      }
    } else {
      throw new Error(`Unsupported Markdown node: ${node.type}`)
    }
  }
  return nodes
}

export default collect
