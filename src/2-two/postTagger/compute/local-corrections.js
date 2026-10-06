const spatial = new Set([
  'above', 'below', 'under', 'over', 'beside', 'behind', 'against',
  'outside', 'inside', 'near', 'beneath', 'underneath', 'aboard',
])
const demonstratives = new Set(['this', 'that', 'these', 'those'])
const doForms = new Set(['do', 'does', 'did'])
const degrees = new Set(['very', 'remarkably', 'extremely', 'quite', 'unusually'])

// Collect against the main sweep's output, before either correction pass tags it.
const localCorrections = sentences => {
  const pending = []
  sentences.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      const term = terms[i]
      const next = terms[i + 1]
      if (!next) {
        continue
      }
      if (spatial.has(term.normal) && !term.tags.has('Verb')) {
        const tags = next.tags
        if (tags.has('Determiner') || tags.has('Possessive') || tags.has('Pronoun') || tags.has('ProperNoun')) {
          pending.push([[term], 'Preposition', 'space-obj'])
        }
      }
      if (demonstratives.has(term.normal)) {
        let end = i + 1
        for (; end < terms.length && terms[end].tags.has('Adverb'); end += 1) {
          // Skip intervening degree/frequency adverbs.
        }
        const tags = terms[end]?.tags
        const prev = terms[i - 1]
        if (tags?.has('Infinitive') && (doForms.has(prev?.normal) || prev?.tags.has('Modal'))) {
          pending.push([[term], 'Pronoun', 'dem-q'])
        }
        if (term.normal === 'this' && tags?.has('PresentTense') && !tags.has('Infinitive') && !tags.has('Gerund')) {
          pending.push([[term], 'Pronoun', 'this-finite-subj'])
        }
      }
      if (term.normal === 'will' && /^\p{Lu}[a-z'\u00C0-\u00FF]/u.test(term.text) && next.tags.has('PastTense')) {
        pending.push([[term], 'FirstName', 'will-past-subj'])
      }
      if (term.switch === 'Adj|Noun' && next.tags.has('Actor') &&
        degrees.has(terms[i - 1]?.normal) && terms[i - 2]?.tags.has('Determiner')) {
        pending.push([[term], 'Adjective', 'degree-actor'])
      }
      if (term.tags.has('TextValue') && term.tags.has('Date') && next.tags.has('TextValue')) {
        pending.push([[term, next], 'Date', 'textvalue-date'])
      }
    }
  })
  return pending
}

export default localCorrections
