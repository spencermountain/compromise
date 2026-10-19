const literals = ['TextNode', 'PunctuationNode', 'WhiteSpaceNode', 'SymbolNode', 'SourceNode']
const children = {
  RootNode: ['ParagraphNode', 'SentenceNode', 'WordNode', ...literals],
  ParagraphNode: ['SentenceNode', 'WhiteSpaceNode', 'SourceNode'],
  SentenceNode: ['WordNode', 'PunctuationNode', 'WhiteSpaceNode', 'SymbolNode', 'SourceNode'],
  WordNode: ['TextNode', 'PunctuationNode', 'SymbolNode', 'SourceNode'],
}

// Read values, not positions: callers may have edited the tree.
const read = (tree, useTags) => {
  const parts = []
  const spans = []
  const ancestors = new Set()
  let offset = 0
  const visit = node => {
    if (!node || typeof node !== 'object' || ancestors.has(node)) {
      throw new TypeError('Invalid NLCST node or cyclic tree')
    }
    const start = offset
    if (Object.hasOwn(children, node.type)) {
      if (!Array.isArray(node.children)) {
        throw new TypeError(`${node.type} requires children`)
      }
      ancestors.add(node)
      node.children.forEach(child => {
        if (!child || !children[node.type].includes(child.type)) {
          throw new TypeError(`Invalid child of ${node.type}`)
        }
        visit(child)
      })
      ancestors.delete(node)
    } else if (literals.includes(node.type) && typeof node.value === 'string') {
      parts.push(node.value)
      offset += node.value.length
    } else {
      throw new TypeError('Invalid NLCST node type or literal value')
    }
    const tags = node.data?.compromise?.tags
    if (useTags && node.type === 'WordNode' && tags !== undefined) {
      if (!Array.isArray(tags) || tags.some(tag => typeof tag !== 'string' || !tag.trim())) {
        throw new TypeError('WordNode tags must be an array of nonempty strings')
      }
      spans.push({ start, end: offset, tags })
    }
  }
  if (tree?.type !== 'RootNode') {
    throw new TypeError('fromAst requires an NLCST RootNode')
  }
  visit(tree)
  return { text: parts.join(''), spans }
}
export default read
