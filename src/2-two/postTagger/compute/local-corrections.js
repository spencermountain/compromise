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
      const prev = terms[i - 1]
      // the books she read: noun readings can settle in the main sweep.
      if (term.normal === 'read' && /^(he|she|it)$/.test(prev?.normal) &&
        terms[i - 2]?.tags.has('Noun') && !terms[i - 2].tags.has('Verb')) {
        pending.push([[term], 'PastTense', 'embedded-read'])
      }
      // The engine-controls failed: the subject becomes plural in the main sweep.
      if (term.switch === 'Adj|Past' && prev?.tags.has('Plural') &&
        prev.tags.has('Hyphenated') && !next) {
        pending.push([[term], 'PastTense', 'hyphen-subject-past'])
      }
      // a left-out-type existence
      if (term.normal === 'type' && prev?.post === '-' && terms[i - 2]?.post === '-' &&
        terms[i - 3]?.tags.has('Determiner') && next?.tags.has('Noun') &&
        terms[i - 2].tags.has('PhrasalVerb')) {
        pending.push([[terms[i - 2], prev], 'Adjective', 'phrasal-type-adjective'])
      }
      // Resolve predicates after noun corrections from the main sweep.
      if (term.switch === 'Plural|Verb' && prev?.tags.has('Singular') && !prev.tags.has('ProperNoun')) {
        let before = i - 2
        for (; before >= 0; before -= 1) {
          if (!terms[before].tags.has('Adjective') && !terms[before].tags.has('Adverb')) {
            break
          }
        }
        if (/^(this|that)$/.test(terms[before]?.normal)) {
          pending.push([[term], 'PresentTense', 'demonstrative-predicate'])
        }
        // Each pay rise helps: allow noun modifiers before the singular head.
        for (; before >= 0; before -= 1) {
          const tags = terms[before].tags
          if (terms[before].post.includes(',') ||
            (!tags.has('Singular') && !tags.has('Adjective') && !tags.has('Adverb'))) {
            break
          }
        }
        if (terms[before]?.normal === 'each' && (!next || !next.tags.has('Noun') || next.tags.has('Pronoun'))) {
          pending.push([[term], 'PresentTense', 'each-predicate'])
        }
      }
      // food, clothing and watches (the comma splits the earlier passes).
      if (term.switch === 'Noun|Gerund' && prev?.tags.has('Noun') && prev.post.includes(',') &&
        next?.normal === 'and' && terms[i + 2]?.switch === 'Plural|Verb') {
        pending.push([[term], 'Noun', 'noun-list-gerund'])
        pending.push([[terms[i + 2]], 'Plural', 'noun-list-plural'])
      }
      // A comma can split a coordinated predicate before left/right tagging.
      if (term.switch === 'Plural|Verb' && prev?.tags.has('PresentTense') &&
        prev.post.includes(',') && next?.normal === 'and' && terms[i + 2]?.tags.has('PresentTense')) {
        pending.push([[term], 'PresentTense', 'coordinated-present'])
      }
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
        if (tags?.has('Infinitive') && (doForms.has(prev?.normal) || prev?.tags.has('Modal'))) {
          pending.push([[term], 'Pronoun', 'dem-q'])
        }
        const subject = term.normal === 'this' || (term.normal === 'that' &&
          (!prev || prev.tags.has('Conjunction') || prev.tags.has('Verb')))
        if (subject && tags?.has('PresentTense') && !tags.has('Infinitive') && !tags.has('Gerund')) {
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
