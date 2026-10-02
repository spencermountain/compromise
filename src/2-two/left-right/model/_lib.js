const context = /^(?:#[A-Za-z][A-Za-z0-9]*|[\p{L}\p{N}][\p{L}\p{N}'’-]*)$/u
const tagName = /^#[a-z][a-z0-9]*$/i

const parseContext = (source, fail) => {
  const alternatives = source.startsWith('(') && source.endsWith(')')
  const values = alternatives ? source.slice(1, -1).split('|') : [source]
  if ((alternatives && values.length < 2) || values.some(value => !context.test(value))) {
    fail()
  }
  const words = new Set()
  const tags = []
  values.forEach(value => {
    if (value.startsWith('#')) {
      tags.push(value.slice(1))
    } else {
      words.add(value)
    }
  })
  return { words, tags }
}

// One target and at most one neighbour on either side, with alternatives.
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
  if (index < 0 || index > 1 || terms.length - index > 2) {
    fail()
  }
  const rule = { tag: parts[1].slice(1), reason: `${word}: ${source}` }
  if (index === 1) {
    rule.pre = parseContext(terms[0], fail)
  }
  if (index < terms.length - 1) {
    rule.post = parseContext(terms[index + 1], fail)
  }
  return rule
}

const compile = rules => Object.fromEntries(Object.entries(rules).map(([word, entries]) => {
  if (!Array.isArray(entries)) {
    throw new Error(`Left-right rules for "${word}" must be an array.`)
  }
  const key = word.startsWith('#') ? word.slice(1) : word
  return [key, entries.map(source => parse(word, source))]
}))

export default compile
