// Neighbours accept literal words or tags; actions accept tags with optional removal.
const context = /^(?:#[A-Za-z][A-Za-z0-9]*|[\p{L}\p{N}][\p{L}\p{N}'’-]*)$/u
const tagName = /^!?#[a-z][a-z0-9]*$/i

const parseContext = (source, fail) => {
  // A parenthesized OR group still describes one neighbour, not several terms.
  const alternatives = source.startsWith('(') && source.endsWith(')')
  const values = alternatives ? source.slice(1, -1).split('|') : [source]
  if ((alternatives && values.length < 2) || values.some(value => !context.test(value))) {
    fail()
  }
  // Compile word membership separately from checks against a term's tag set.
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
    throw new Error(`Invalid left-right rule for "${word}": ${source}. Expected "[pre] _ [post] -> #Tag | !#Tag".`)
  }
  if (typeof source !== 'string') {
    fail()
  }
  const parts = source.split('->').map(s => s.trim())
  if (parts.length !== 2) {
    fail()
  }
  // On the right, pipes sequence actions: every action runs in source order.
  const actions = parts[1].split('|').map(s => s.trim()).map(action => {
    if (!tagName.test(action)) {
      fail()
    }
    if (action.startsWith('!')) {
      return { unTag: action.slice(2) }
    }
    return { tag: action.slice(1) }
  })
  // The key selects the target; '_' marks its position between optional neighbours.
  // Whitespace separates terms, so alternatives cannot contain spaces.
  const terms = parts[0].split(/\s+/)
  const index = terms.indexOf('_')
  if (index < 0 || index > 1 || terms.length - index > 2) {
    fail()
  }
  const rule = { actions, reason: `${word}: ${source}` }
  if (index === 1) {
    let pre = terms[0]
    if (pre.startsWith('^')) {
      pre = pre.slice(1)
      // Distance from the clause start: target first, or its neighbour first.
      rule.start = pre ? 1 : 0
    }
    if (pre) {
      rule.pre = parseContext(pre, fail)
    }
  }
  if (index < terms.length - 1) {
    let post = terms[index + 1]
    if (post.endsWith('$')) {
      post = post.slice(0, -1)
      // Distance from the clause end: target last, or its neighbour last.
      rule.end = post ? 1 : 0
    }
    if (post) {
      rule.post = parseContext(post, fail)
    }
  }
  return rule
}

// Run once when loading the model; runtime keys use normal/tag/switch values directly.
const compile = rules => Object.fromEntries(Object.entries(rules).map(([word, entries]) => {
  if (!Array.isArray(entries)) {
    throw new Error(`Left-right rules for "${word}" must be an array.`)
  }
  let key = word
  if (word.startsWith('#')) {
    key = word.slice(1)
  } else if (word.startsWith('%') && word.endsWith('%')) {
    key = word.slice(1, -1)
  }
  return [key, entries.map(source => parse(word, source))]
}))

export default compile
