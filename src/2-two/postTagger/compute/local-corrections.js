import {
  Sing, Pres, NN, Vb, Past, Plur, Det, Phrasal, Adj, Prop, Adv, Pron, Poss, Prep,
  Inf, Mod, Conj, Ger, First, Actor, TxtNum, Date,
} from '../../preTagger/tagSet/_lib.js'
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
    // Sentence-final relative predicates: 'the dog that barks sleeps'.
    const last = terms.length - 1
    if (terms[last]?.switch === 'Plural|Verb' &&
      /^(barks|snores)$/.test(terms[last - 1]?.normal) &&
      /^(that|which|who)$/.test(terms[last - 2]?.normal) &&
      terms[last - 3]?.tags.has(Sing)) {
      pending.push([[terms[last - 1], terms[last]], Pres, 'relative-main-verb'])
    }
    for (let i = 0; i < terms.length; i += 1) {
      const term = terms[i]
      const next = terms[i + 1]
      const prev = terms[i - 1]
      // the books she read: noun readings can settle in the main sweep.
      if (term.normal === 'read' && /^(he|she|it)$/.test(prev?.normal) &&
        terms[i - 2]?.tags.has(NN) && !terms[i - 2].tags.has(Vb)) {
        pending.push([[term], Past, 'embedded-read'])
      }
      // The engine-controls failed: the subject becomes plural in the main sweep.
      if (term.switch === 'Adj|Past' && prev?.tags.has(Plur) &&
        prev.tags.has('Hyphenated') && !next) {
        pending.push([[term], Past, 'hyphen-subject-past'])
      }
      // a left-out-type existence
      if (term.normal === 'type' && prev?.post === '-' && terms[i - 2]?.post === '-' &&
        terms[i - 3]?.tags.has(Det) && next?.tags.has(NN) &&
        terms[i - 2].tags.has(Phrasal)) {
        pending.push([[terms[i - 2], prev], Adj, 'phrasal-type-adjective'])
      }
      // Resolve predicates after noun corrections from the main sweep.
      if (term.switch === 'Plural|Verb' && prev?.tags.has(Sing) && !prev.tags.has(Prop)) {
        let before = i - 2
        for (; before >= 0; before -= 1) {
          if (!terms[before].tags.has(Adj) && !terms[before].tags.has(Adv)) {
            break
          }
        }
        if (/^(this|that)$/.test(terms[before]?.normal)) {
          pending.push([[term], Pres, 'demonstrative-predicate'])
        }
        // Each pay rise helps: allow noun modifiers before the singular head.
        for (; before >= 0; before -= 1) {
          const tags = terms[before].tags
          if (terms[before].post.includes(',') ||
            (!tags.has(Sing) && !tags.has(Adj) && !tags.has(Adv))) {
            break
          }
        }
        if (terms[before]?.normal === 'each' && (!next || !next.tags.has(NN) || next.tags.has(Pron))) {
          pending.push([[term], Pres, 'each-predicate'])
        }
      }
      // food, clothing and watches (the comma splits the earlier passes).
      if (term.switch === 'Noun|Gerund' && prev?.tags.has(NN) && prev.post.includes(',') &&
        next?.normal === 'and' && terms[i + 2]?.switch === 'Plural|Verb') {
        pending.push([[term], NN, 'noun-list-gerund'])
        pending.push([[terms[i + 2]], Plur, 'noun-list-plural'])
      }
      // A comma can split a coordinated predicate before left/right tagging.
      if (term.switch === 'Plural|Verb' && prev?.tags.has(Pres) &&
        prev.post.includes(',') && next?.normal === 'and' && terms[i + 2]?.tags.has(Pres)) {
        pending.push([[term], Pres, 'coordinated-present'])
      }
      if (!next) {
        continue
      }
      if (spatial.has(term.normal) && !term.tags.has(Vb)) {
        const tags = next.tags
        if (tags.has(Det) || tags.has(Poss) || tags.has(Pron) || tags.has(Prop)) {
          pending.push([[term], Prep, 'space-obj'])
        }
      }
      if (demonstratives.has(term.normal)) {
        let end = i + 1
        for (; end < terms.length && terms[end].tags.has(Adv); end += 1) {
          // Skip intervening degree/frequency adverbs.
        }
        const tags = terms[end]?.tags
        if (tags?.has(Inf) && (doForms.has(prev?.normal) || prev?.tags.has(Mod))) {
          pending.push([[term], Pron, 'dem-q'])
        }
        const subject = term.normal === 'this' || (term.normal === 'that' &&
          (!prev || prev.tags.has(Conj) || prev.tags.has(Vb)))
        if (subject && tags?.has(Pres) && !tags.has(Inf) && !tags.has(Ger)) {
          pending.push([[term], Pron, 'this-finite-subj'])
        }
      }
      if (term.normal === 'will' && /^\p{Lu}[a-z'\u00C0-\u00FF]/u.test(term.text) && next.tags.has(Past)) {
        pending.push([[term], First, 'will-past-subj'])
      }
      // modal 'will' is never followed by 'is' - 'Will is tall'
      if (term.normal === 'will' && /^\p{Lu}[a-z'\u00C0-\u00FF]/u.test(term.text) && (next.machine || next.normal) === 'is') {
        pending.push([[term], First, 'will-is-subj'])
      }
      if (term.switch === 'Adj|Noun' && next.tags.has(Actor) &&
        degrees.has(terms[i - 1]?.normal) && terms[i - 2]?.tags.has(Det)) {
        pending.push([[term], Adj, 'degree-actor'])
      }
      if (term.tags.has(TxtNum) && term.tags.has(Date) && next.tags.has(TxtNum)) {
        pending.push([[term, next], Date, 'textvalue-date'])
      }
    }
  })
  return pending
}

export default localCorrections
