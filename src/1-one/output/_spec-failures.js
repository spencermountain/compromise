// Diagnostics describe the original parse, before the returned View is mutated.
const specFailures = (doc, slots, patterns, aliases) => {
  const terms = doc.docs.flat()
  const failures = []
  if (terms.length !== slots.length) {
    failures.push({
      code: 'length', expected: slots.length, actual: terms.length,
      message: `expected ${slots.length} terms, got ${terms.length}`,
    })
  }
  doc.compute('tagRank')
  slots.forEach((slot, i) => {
    const term = terms[i]
    const actual = term ? Array.from(term.tags) : []
    const detail = { term: i + 1, word: term?.implicit || term?.text || '', expected: slot, actual }
    if (patterns[i] === null) {
      failures.push({ ...detail, code: 'syntax', message: `term ${i + 1}: invalid slot ${slot.join('|')}` })
      return
    }
    if (!term) {
      return // covered by the length error
    }
    const problems = []
    slot.forEach(value => {
      if (value === '.') {
        return
      }
      const negative = value.startsWith('!')
      const tag = value.replace(/^!?#?/, '')
      const present = term.tags.has(aliases[tag] || tag)
      if (negative && present) {
        problems.push(`unexpected #${tag}`)
      } else if (!negative && !present) {
        problems.push(`missing #${tag}`)
      }
    })
    if (problems.length > 0) {
      const best = term.tagRank?.[0] || actual.at(-1) || 'Untagged'
      failures.push({
        ...detail, code: 'tags',
        message: `term ${i + 1} '${detail.word}': #${best}, ${problems.join(', ')}`,
      })
    }
  })
  if (failures.length === 0) {
    failures.push({ code: 'match', message: 'tags align, but the sentence pattern did not match' })
  }
  return failures
}

export default specFailures
