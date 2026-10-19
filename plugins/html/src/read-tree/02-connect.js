const connectNodes = (doc, nodes, binding) => {
  const { terms, layout, protectedTerms } = binding
  const allTerms = doc.termList()
  nodes.forEach(node => layout.set(node, []))
  let index = 0
  let cursor = 0
  // Temporary source cursors align normalized text without changing AST values.
  const current = () => {
    for (; index < nodes.length && cursor === nodes[index].value.length; index += 1) {
      cursor = 0
    }
    return nodes[index]
  }
  const append = (node, text, source) => {
    const entries = layout.get(node)
    const last = entries.at(-1)
    if (source) {
      // One word owns one part per contributing node, not one part per character.
      if (last && typeof last !== 'string' && last.source === source) {
        last.text += text
      } else {
        const part = { node, text, source }
        source.parts.push(part)
        entries.push(part)
      }
    } else if (typeof last === 'string') {
      entries[entries.length - 1] += text
    } else {
      entries.push(text)
    }
    cursor += text.length
  }
  const consume = (value, source, whitespace = false) => {
    for (let i = 0; i < value.length; i += 1) {
      let node = current()
      // Some tokenizer paths invent trailing whitespace (for example, <3).
      if (!node && whitespace && !value.slice(i).trim()) {
        return true
      }
      if (!node) {
        return false
      }
      if (whitespace && value[i] === ' ' && /[\t\n\f\r ]/.test(node.value[cursor])) {
        // A single NLP space can cover a source run spanning several text nodes.
        for (; node && /[\t\n\f\r ]/.test(node.value[cursor]); node = current()) {
          const text = node.value.slice(cursor).match(/^[\t\n\f\r ]+/)[0]
          append(node, text, null)
        }
      } else {
        if (node.value[cursor] !== value[i]) {
          return false
        }
        append(node, value[i], source)
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
