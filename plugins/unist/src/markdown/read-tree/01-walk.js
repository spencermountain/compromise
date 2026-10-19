import fmtNode, { modeFor } from './node-formats.js'

const walk = (tree, options = {}) => {
  const nodes = []
  const groups = []
  let group = []
  const flush = () => {
    if (group.length) {
      groups.push(group)
      group = []
    }
  }
  const append = node => {
    nodes.push(node)
    group.push(node)
  }
  // Synthetic text exists only in the NLP view; it is never inserted into the AST.
  const generate = value => {
    if (value) {
      append({ type: 'text', value, generated: true })
    }
  }
  const stack = [{ node: tree }]
  for (; stack.length > 0;) {
    const { node, exit, behavior, inherited } = stack.pop()
    if (exit) {
      generate(behavior.suffix)
      if (behavior.block) {
        flush()
      }
      continue
    }
    if (!Object.hasOwn(fmtNode, node.type)) {
      throw new Error(`Unsupported Markdown node: ${node.type}`)
    }
    const mode = modeFor(node.type, options, inherited)
    if (mode === 'skip') {
      flush()
      continue
    }
    const fmt = fmtNode[node.type](node, mode)
    // A list/quote prefix must stay beside the first paragraph inside its wrapper.
    if (fmt.block && group.some(part => !part.generated)) {
      flush()
    }
    generate(fmt.prefix)
    if (fmt.text) {
      append(node)
    } else if (fmt.generated !== undefined) {
      generate(fmt.generated)
    } else if (node.children) {
      stack.push({ node, exit: true, behavior: fmt })
      for (let i = node.children.length - 1; i >= 0; i -= 1) {
        stack.push({ node: node.children[i], inherited: fmt.childMode })
      }
      continue
    } else {
      throw new Error(`Expected children for Markdown node: ${node.type}`)
    }
    generate(fmt.suffix)
    if (fmt.block) {
      flush()
    }
  }
  flush()
  return { nodes, groups }
}

export default walk
