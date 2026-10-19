// Selections share document identity; clones get a new document and stay detached.
const documents = new WeakMap()
// Each Term field owns a sequence of { node, text } fragments, not moving offsets.
const terms = new WeakMap()
// Punctuation can live outside the markup surrounding the word itself.
const fields = ['pre', 'text', 'post']

// Cursors are used only during import; stored bindings contain node references.
const bind = (doc, nodes) => {
  let index = 0
  let cursor = 0
  // Consume source text in order: repeated words never require a string search.
  const consume = value => {
    const parts = []
    for (let remaining = value; remaining.length > 0;) {
      if (!nodes[index]) {
        throw new Error('Cannot align tokenized text with the Markdown tree')
      }
      const node = nodes[index]
      const text = node.value.slice(cursor, cursor + remaining.length)
      if (!remaining.startsWith(text)) {
        throw new Error('Cannot align tokenized text with the Markdown tree')
      }
      if (text) {
        // A word such as walk*ed* contributes fragments from two different nodes.
        parts.push({ node, text })
      }
      remaining = remaining.slice(text.length)
      cursor += text.length
      if (cursor === node.value.length) {
        index += 1
        cursor = 0
      }
    }
    return parts
  }
  doc.termList().forEach(term => {
    const binding = {}
    fields.forEach(field => binding[field] = consume(term[field]))
    terms.set(term, binding)
  })
  if (nodes.slice(index).some((node, i) => node.value.length > (i === 0 ? cursor : 0))) {
    throw new Error('Tokenization did not preserve all Markdown text')
  }
}

const transfer = ({ oldTerms, newTerms, document }) => {
  // The hook also runs for ordinary documents, which have no AST bindings.
  if (!documents.has(document)) {
    return
  }
  const bindings = oldTerms.map(term => terms.get(term))
  if (bindings.some(binding => !binding)) {
    return
  }
  // One owner can safely accept several replacement words (walked -> had walked).
  const owners = new Set(bindings.flatMap(binding => binding.text.map(part => part.node)))
  if (owners.size !== 1) {
    return // Unbound replacement terms are reported at write-back.
  }
  const node = [...owners][0]
  newTerms.forEach((term, i) => {
    const binding = {}
    fields.forEach(field => binding[field] = [{ node, text: term[field] }])
    // Keep the original outside punctuation; new internal spaces belong to this node.
    if (i === 0) {
      binding.pre = bindings[0].pre
    }
    if (i === newTerms.length - 1) {
      binding.post = bindings.at(-1).post
    }
    terms.set(term, binding)
  })
}

export { documents, terms, fields, bind, transfer }
