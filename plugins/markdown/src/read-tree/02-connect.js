const connectNodes = (doc, nodes, binding) => {
  // All prose runs contribute to the same document-owned lookup and node layouts.
  const { terms, layout } = binding
  nodes.forEach(node => layout.set(node, []))
  if (!doc.termList().length) {
    nodes.forEach(node => layout.set(node, [node.value]))
    return
  }
  let index = 0
  let cursor = 0
  // Temporary import cursors align text in order; no moving offsets are retained.
  const consume = (value, source) => {
    for (let remaining = value; remaining.length > 0;) {
      const node = nodes[index]
      if (!node) {
        throw new Error('Cannot align tokenized text with the Markdown tree')
      }
      const text = node.value.slice(cursor, cursor + remaining.length)
      if (!remaining.startsWith(text)) {
        throw new Error('Cannot align tokenized text with the Markdown tree')
      }
      if (text) {
        if (source) {
          // walk*ed* has two word fragments; **walked** followed by a space has one.
          const part = { node, text, source }
          source.parts.push(part)
          layout.get(node).push(part)
        } else {
          layout.get(node).push(text)
        }
      }
      remaining = remaining.slice(text.length)
      cursor += text.length
      if (cursor === node.value.length) {
        index += 1
        cursor = 0
      }
    }
  }
  doc.termList().forEach(term => {
    const source = { parts: [] }
    consume(term.pre)
    consume(term.text, source)
    consume(term.post)
    terms.set(term, source)
  })
  if (nodes.slice(index).some((node, i) => node.value.length > (i === 0 ? cursor : 0))) {
    throw new Error('Tokenization did not preserve all Markdown text')
  }
}

export default connectNodes
