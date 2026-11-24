import specFailures from '../../1-one/output/_spec-failures.js'

// one row per failing term, missing term, or extra term
const toRows = (doc, slots, failures) => {
  const terms = doc.docs.flat()
  const wrong = new Set(failures.map(failure => failure.term - 1))
  const rows = []
  const max = Math.max(terms.length, slots.length)
  for (let i = 0; i < max; i += 1) {
    const term = terms[i]
    if (wrong.has(i) || !term || !slots[i]) {
      const word = term?.implicit || term?.text || ''
      rows.push({ index: i, word, want: (slots[i] || []).join('|'), bestTag: term?.tagRank?.[0] || '' })
    }
  }
  return rows
}

// validate each spec line with the normal tagger, as plain data
const checkSpec = function (spec) {
  const { model, methods } = this.world()
  const aliases = model.one.tagAliases
  const list = []
  methods.one.parseSpec(spec).forEach(({ line, text, tags, comment }) => {
    const res = { line, text: text.trim(), tags: null, comment, status: 'skip', failures: [] }
    if (tags !== null) {
      const doc = this(text)
      res.tags = tags.map(slot => slot.join('|'))
      res.failures = toRows(doc, tags, specFailures(doc, tags, aliases))
      // judged per term, so a line may hold several sentences
      res.status = res.failures.length > 0 ? 'fail' : 'pass'
    }
    list.push(res)
  })
  return list
}

export default checkSpec
