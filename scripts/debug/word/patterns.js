// Candidates in tagger order; earlier tags may prevent these from running.
const patterns = (model, word) => {
  const matches = []
  const add = (kind, pattern, tag, file) => matches.push({
    kind, pattern, tag, source: `src/2-two/preTagger/model/patterns/${file}.js`,
  })
  for (let size = Math.min(7, word.length - 1); size > 1; size -= 1) {
    const suffix = word.slice(-size)
    const tag = model.suffixPatterns[size]?.[suffix]
    if (tag) {
      add('suffix', `-${suffix}`, tag, 'suffixes')
      break
    }
  }
  const ending = (model.endsWith[word.at(-1)] || []).find(([regex]) => regex.test(word))
  if (ending) {
    add('suffix regex', String(ending[0]), ending[1], 'endsWith')
  }
  for (let size = Math.min(7, word.length - 3); size > 2; size -= 1) {
    const prefix = word.slice(0, size)
    const tag = model.prefixPatterns[size]?.[prefix]
    if (tag) {
      add('prefix', `${prefix}-`, tag, 'prefixes')
      break
    }
  }
  return matches
}

export default patterns
