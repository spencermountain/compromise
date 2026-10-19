import { blocks, skipped } from './defaults.js'

const walk = tree => {
  const nodes = []
  const groups = []
  let group = []
  const flush = () => {
    if (group.length) {
      groups.push(group)
      group = []
    }
  }
  // Iterative traversal avoids growing the call stack for deeply nested markup.
  const stack = [{ node: tree }]
  for (; stack.length;) {
    const { node, exit } = stack.pop()
    if (exit) {
      flush()
      continue
    }
    if (node.type === 'text') {
      nodes.push(node)
      group.push(node)
      continue
    }
    // Comments and doctypes have no visible text and must not split inline words.
    if (node.type === 'comment' || node.type === 'doctype') {
      continue
    }
    if (node.type !== 'root' && node.type !== 'element') {
      throw new Error(`Unsupported HTML node: ${node.type}`)
    }
    const hidden = node.properties?.hidden
    if (skipped.has(node.tagName) || (hidden != null && hidden !== false)) {
      // Omitted subtrees are barriers, so their neighbours cannot form one word.
      flush()
      continue
    }
    if (blocks.has(node.tagName)) {
      flush()
      stack.push({ exit: true })
    }
    if (!Array.isArray(node.children)) {
      throw new Error(`Expected children for HTML node: ${node.tagName || node.type}`)
    }
    for (let i = node.children.length - 1; i >= 0; i -= 1) {
      stack.push({ node: node.children[i] })
    }
  }
  flush()
  return { nodes, groups }
}

export default walk
