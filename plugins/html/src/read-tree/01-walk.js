import blocks from './blocks.js'
import attributeSource from './_lib.js'

// HAST uses camelCase property names for HTML attributes such as aria-label.
const textAttributes = [
  ['altText', 'alt'],
  ['titleAttribute', 'title'],
  ['ariaLabel', 'ariaLabel'],
  ['placeholder', 'placeholder'],
]

const walk = (tree, options = {}, attributes = new WeakMap()) => {
  const nodes = []
  const groups = []
  let group = []
  const flush = () => {
    if (group.length) {
      groups.push(group)
      group = []
    }
  }
  const separate = node => {
    flush()
    nodes.push(node)
    groups.push([node])
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
    // Disabled comments stay transparent so walk<!-- note -->ed remains one word.
    if (node.type === 'comment' || node.type === 'doctype') {
      if (node.type === 'comment' && options.comments) {
        separate(node)
      }
      continue
    }
    if (node.type !== 'root' && node.type !== 'element') {
      throw new Error(`Unsupported HTML node: ${node.type}`)
    }
    const hidden = node.properties?.hidden
    const excluded = Object.hasOwn(options, node.tagName) && options[node.tagName] === false
    if (excluded || (hidden != null && hidden !== false)) {
      // Omitted subtrees are barriers, so their neighbours cannot form one word.
      flush()
      continue
    }
    if (node.type === 'element') {
      textAttributes.forEach(([option, property]) => {
        if (options[option] && typeof node.properties?.[property] === 'string') {
          separate(attributeSource(node, property, attributes))
        }
      })
    }
    if (blocks.has(node.tagName)) {
      flush()
      stack.push({ exit: true })
    }
    // HAST stores template descendants in a separate root, not in children.
    const children = node.tagName === 'template' ? node.content?.children : node.children
    if (!Array.isArray(children)) {
      throw new Error(`Expected children for HTML node: ${node.tagName || node.type}`)
    }
    for (let i = children.length - 1; i >= 0; i -= 1) {
      stack.push({ node: children[i] })
    }
  }
  flush()
  return { nodes, groups }
}

export default walk
