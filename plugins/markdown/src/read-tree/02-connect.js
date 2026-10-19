const connectNodes = (doc, nodes, binding) => {
  const { terms, layout, protectedTerms } = binding
  const allTerms = doc.termList()
  nodes.forEach(node => layout.set(node, []))
  let index = 0
  let cursor = 0
  // Cursors only align original characters; they are never stored on a Term.
  const consume = (value, source, whitespace = false) => {
    for (let remaining = value; remaining.length > 0;) {
      const node = nodes[index]
      // Some tokenizer paths invent trailing whitespace (for example, <3).
      if (!node && whitespace && !remaining.trim()) {
        return true
      }
      if (!node) {
        return false
      }
      const text = node.value.slice(cursor, cursor + remaining.length)
      if (!remaining.startsWith(text)) {
        return false
      }
      if (text) {
        if (source) {
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
    return true
  }
  const protect = term => {
    protectedTerms.set(term, { text: term.text, implicit: term.implicit })
  }
  const aligned = allTerms.every(term => {
    const source = { parts: [], readOnly: Boolean(term.implicit) }
    if (!consume(term.pre, null, true) || !consume(term.text, source) || !consume(term.post, null, true)) {
      return false
    }
    terms.set(term, source)
    // Implicit terms have no independent source spelling; leave them untouched.
    if (term.implicit || !source.parts.length) {
      protect(term)
    }
    return true
  })
  const remaining = nodes.slice(index).some((node, i) => node.value.length > (i === 0 ? cursor : 0))
  if (!aligned || remaining) {
    // No guessing/searching: preserve an unalignable run verbatim and allow reading.
    // Other prose runs remain editable; edits to this run fail during write-back.
    nodes.forEach(node => layout.set(node, [node.value]))
    allTerms.forEach(term => {
      terms.set(term, { parts: [], readOnly: true })
      protect(term)
    })
  }
}

export default connectNodes
