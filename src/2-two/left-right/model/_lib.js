const context = /^(?:#[A-Za-z][A-Za-z0-9]*|[\p{L}\p{N}][\p{L}\p{N}'’-]*)$/u
const tagName = /^#[a-z][a-z0-9]*$/i

// One target and at most one literal/tag neighbour on either side.
const parse = (word, source) => {
  const fail = () => {
    throw new Error(`Invalid left-right rule for "${word}": ${source}. Expected "[pre] _ [post] -> #Tag".`)
  }
  if (typeof source !== 'string') {
    fail()
  }
  const parts = source.split('->').map(s => s.trim())
  if (parts.length !== 2 || !tagName.test(parts[1])) {
    fail()
  }
  const terms = parts[0].split(/\s+/)
  const index = terms.indexOf('_')
  if (index < 0 || index > 1 || terms.length - index > 2 ||
    terms.some((term, i) => i !== index && !context.test(term))) {
    fail()
  }
  const rule = { tag: parts[1].slice(1), reason: `${word}: ${source}` }
  if (index === 1) {
    rule.pre = terms[0]
  }
  if (index < terms.length - 1) {
    rule.post = terms[index + 1]
  }
  return rule
}

const compile = rules => Object.fromEntries(Object.entries(rules).map(([word, entries]) => {
  if (!Array.isArray(entries)) {
    throw new Error(`Left-right rules for "${word}" must be an array.`)
  }
  return [word, entries.map(source => parse(word, source))]
}))

export default compile
