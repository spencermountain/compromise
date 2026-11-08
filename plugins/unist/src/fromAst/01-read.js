import terms from './02-terms.js'

const literals = ['TextNode', 'PunctuationNode', 'WhiteSpaceNode', 'SymbolNode', 'SourceNode']
const children = {
  RootNode: ['ParagraphNode', 'SentenceNode', 'WordNode', ...literals],
  ParagraphNode: ['SentenceNode', 'WhiteSpaceNode', 'SourceNode'],
  SentenceNode: ['WordNode', 'PunctuationNode', 'WhiteSpaceNode', 'SymbolNode', 'SourceNode'],
  WordNode: ['TextNode', 'PunctuationNode', 'SymbolNode', 'SourceNode'],
}

// Construct terms from node boundaries; source positions may be stale.
const read = (tree, useTags) => {
  const output = terms()
  const visit = (node, parent) => {
    if (!node || typeof node !== 'object') {
      throw new TypeError('Invalid NLCST node')
    }
    if (Object.hasOwn(children, node.type)) {
      if (!Array.isArray(node.children)) {
        throw new TypeError(`${node.type} requires children`)
      }
      const boundary = node.type === 'ParagraphNode' || node.type === 'SentenceNode'
      if (boundary) {
        output.start()
      }
      node.children.forEach(child => {
        if (!child || !children[node.type].includes(child.type)) {
          throw new TypeError(`Invalid child of ${node.type}`)
        }
        visit(child, node.type)
      })
      if (node.type === 'WordNode') {
        let tags = []
        if (useTags && node.data?.compromise?.tags !== undefined) {
          tags = node.data.compromise.tags
          if (!Array.isArray(tags) || tags.some(tag => typeof tag !== 'string' || !tag.trim())) {
            throw new TypeError('WordNode tags must be an array of nonempty strings')
          }
        }
        output.word(node.children.map(child => child.value).join(''), tags)
      }
      if (boundary) {
        output.flush(node.type === 'SentenceNode')
      }
    } else if (literals.includes(node.type) && typeof node.value === 'string') {
      // Word children are combined into exactly one term by their parent.
      if (parent === 'WordNode') {
        return
      }
      if (node.type === 'WhiteSpaceNode' || node.type === 'PunctuationNode') {
        output.affix(node.value, parent === 'SentenceNode')
      } else {
        output.word(node.value)
      }
    } else {
      throw new TypeError('Invalid NLCST node type or literal value')
    }
  }
  if (tree?.type !== 'RootNode') {
    throw new TypeError('fromAst requires an NLCST RootNode')
  }
  visit(tree)
  output.flush()
  return output.document
}
export default read
