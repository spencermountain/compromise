// called every doc.replace() so we can shuffle our metadata around
const onTransfer = ({ oldTerms, newTerms, document }) => {
  const binding = document.htmlAst
  if (!binding) {
    return // Ordinary compromise documents have no AST connection.
  }
  const { terms } = binding
  const sources = oldTerms.map(term => terms.get(term))
  if (!sources.length || !newTerms.length || sources.some(source => !source || source.readOnly)) {
    return
  }
  const owners = new Set(sources.flatMap(source => source.parts.map(part => part.node)))
  if (owners.size !== 1) {
    return // Missing bindings cause an explicit failure at write-back.
  }
  const node = [...owners][0]
  const entries = binding.layout.get(node)
  const start = entries.indexOf(sources[0].parts[0])
  const end = entries.indexOf(sources.at(-1).parts.at(-1))
  const covered = entries.slice(start, end + 1).filter(entry => typeof entry !== 'string')
  if (
    start < 0 ||
    end < start ||
    covered.length !== sources.length ||
    covered.some((part, i) => part.source !== sources[i])
  ) {
    return
  }
  // Replace word slots and their internal separators, keeping outside text untouched.
  const replacement = []
  newTerms.forEach((term, i) => {
    if (i > 0) {
      replacement.push(newTerms[i - 1].post + term.pre)
    }
    const source = { parts: [] }
    const part = { node, text: term.text, source }
    source.parts.push(part)
    replacement.push(part)
    terms.set(term, source)
  })
  entries.splice(start, end - start + 1, ...replacement)
}
export default onTransfer
