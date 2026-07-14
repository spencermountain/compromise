// the 'spec' output format - a clean sentence + an ordered list of top-level tags
// designed to round-trip between compromise and LLMs (see docs/spec-format.md)

// roots that describe a token's shape, not its part-of-speech - never picked over a real POS
const attributeTags = new Set(['Hyphenated', 'Prefix', 'SlashedTerm'])

// walk a tag up to its top-level (root) ancestor
const rootOf = function (tag, tagSet) {
  const entry = tagSet[tag]
  if (!entry || !entry.parents || entry.parents.length === 0) {
    return tag
  }
  for (let i = 0; i < entry.parents.length; i += 1) {
    const p = entry.parents[i]
    if (tagSet[p] && (!tagSet[p].parents || tagSet[p].parents.length === 0)) {
      return p
    }
  }
  return entry.parents[entry.parents.length - 1]
}

// reduce a term's tag-set to a single top-level tag (or '-' when untagged)
const slotForTerm = function (term, tagSet) {
  const tags = Array.from(term.tags || [])
  if (tags.length === 0) {
    return '-'
  }
  const primary = tags.find(t => !attributeTags.has(rootOf(t, tagSet))) || tags[0]
  return rootOf(primary, tagSet)
}

const makeAliases = function (tagSet) {
  const aliases = {}
  for (const tag in tagSet) {
    const entry = tagSet[tag]
    if (entry.alias) {
      aliases[tag] = entry.alias
    }
  }
  return aliases
}

// one line per sentence: '<text> {Tag,Tag,…}'
const toSpec = function (doc, world) {
  const tagSet = world.model.one.tagSet
  const aliases = makeAliases(tagSet)
  return doc.docs.map(terms => {
    const text = terms.reduce((str, t) => str + t.pre + t.text + t.post, '').trim()
    const tags = terms.map(t => {
      let tag = slotForTerm(t, tagSet)
      return aliases[tag] || tag
    }).join(',')
    return `${text} {${tags}}`
  }).join('\n')
}

export default toSpec
