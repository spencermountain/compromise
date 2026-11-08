import {
  Sing, Pres, NN, Vb, Past, Plur, Det, Phrasal, Adj, Prop, Adv, Pron, Poss, Prep,
  Inf, Mod, Conj, Ger, First, Actor, TxtNum, Date, Year, Hyphenated, PluralVerb, AdjPast, NounGerund, AdjNoun,
} from '../../preTagger/tagSet/_lib.js'
import { hasAny, toSet } from '../../_lib.js'
const spatial = toSet('above below under over beside behind against outside inside near beneath underneath aboard')
const demonstratives = toSet('this that these those')
const doForms = toSet('do does did')
const degrees = toSet('very remarkably extremely quite unusually')
// Will, Wíll
const titleCase = /^\p{Lu}[a-z'\u00C0-\u00FF]/u

// Collect against the main sweep's output, before either correction pass tags it.
const localCorrections = sentences => {
  const pending = []
  const add = (list, tag, reason) => pending.push([list, tag, reason])
  sentences.forEach(terms => {
    // Sentence-final relative predicates: 'the dog that barks sleeps'.
    const last = terms.length - 1
    if (terms[last]?.switch === PluralVerb &&
      /^(barks|snores)$/.test(terms[last - 1]?.normal) &&
      /^(that|which|who)$/.test(terms[last - 2]?.normal) &&
      terms[last - 3]?.tags.has(Sing)) {
      add([terms[last - 1], terms[last]], Pres, 'relative-main-verb')
    }
    terms.forEach((term, i) => {
      const next = terms[i + 1]
      const prev = terms[i - 1]
      // the books she read: noun readings can settle in the main sweep.
      if (term.normal === 'read' && /^(he|she|it)$/.test(prev?.normal) &&
        terms[i - 2]?.tags.has(NN) && !terms[i - 2].tags.has(Vb)) {
        add([term], Past, 'embedded-read')
      }
      // The engine-controls failed: the subject becomes plural in the main sweep.
      if (term.switch === AdjPast && prev?.tags.has(Plur) &&
        prev.tags.has(Hyphenated) && !next) {
        add([term], Past, 'hyphen-subject-past')
      }
      // a left-out-type existence
      if (term.normal === 'type' && prev?.post === '-' && terms[i - 2]?.post === '-' &&
        terms[i - 3]?.tags.has(Det) && next?.tags.has(NN) &&
        terms[i - 2].tags.has(Phrasal)) {
        add([terms[i - 2], prev], Adj, 'phrasal-type-adjective')
      }
      // Resolve predicates after noun corrections from the main sweep.
      if (term.switch === PluralVerb && prev?.tags.has(Sing) && !prev.tags.has(Prop) && !prev.tags.has(Poss)) {
        let before = i - 2
        for (; before >= 0; before -= 1) {
          if (!hasAny(terms[before], Adj, Adv)) {
            break
          }
        }
        if (/^(this|that)$/.test(terms[before]?.normal)) {
          add([term], Pres, 'demonstrative-predicate')
        }
        // Each pay rise helps: allow noun modifiers before the singular head.
        for (; before >= 0; before -= 1) {
          if (terms[before].post.includes(',') || !hasAny(terms[before], Sing, Adj, Adv)) {
            break
          }
        }
        if (terms[before]?.normal === 'each' && (!next || !next.tags.has(NN) || next.tags.has(Pron))) {
          add([term], Pres, 'each-predicate')
        }
      }
      // food, clothing and watches (the comma splits the earlier passes).
      if (term.switch === NounGerund && prev?.tags.has(NN) && prev.post.includes(',') &&
        next?.normal === 'and' && terms[i + 2]?.switch === PluralVerb) {
        add([term], NN, 'noun-list-gerund')
        add([terms[i + 2]], Plur, 'noun-list-plural')
      }
      // A comma can split a coordinated predicate before left/right tagging.
      if (term.switch === PluralVerb && prev?.tags.has(Pres) &&
        prev.post.includes(',') && next?.normal === 'and' && terms[i + 2]?.tags.has(Pres)) {
        add([term], Pres, 'coordinated-present')
      }
      if (!next) {
        return
      }
      if (spatial.has(term.normal) && !term.tags.has(Vb) && hasAny(next, Det, Poss, Pron, Prop)) {
        add([term], Prep, 'space-obj')
      }
      if (demonstratives.has(term.normal)) {
        let end = i + 1
        for (; end < terms.length && terms[end].tags.has(Adv); end += 1) {
          // Skip intervening degree/frequency adverbs.
        }
        const tags = terms[end]?.tags
        if (tags?.has(Inf) && (doForms.has(prev?.normal) || prev?.tags.has(Mod))) {
          add([term], Pron, 'dem-q')
        }
        const subject = term.normal === 'this' || (term.normal === 'that' &&
          (!prev || hasAny(prev, Conj, Vb)))
        if (subject && tags?.has(Pres) && !hasAny(terms[end], Inf, Ger)) {
          add([term], Pron, 'this-finite-subj')
        }
      }
      if (term.normal === 'will' && titleCase.test(term.text)) {
        if (next.tags.has(Past)) {
          add([term], First, 'will-past-subj')
        }
        // modal 'will' is never followed by 'is' - 'Will is tall'
        if ((next.machine || next.normal) === 'is') {
          add([term], First, 'will-is-subj')
        }
      }
      if (term.switch === AdjNoun && next.tags.has(Actor) &&
        degrees.has(prev?.normal) && terms[i - 2]?.tags.has(Det)) {
        add([term], Adj, 'degree-actor')
      }
      // a spoken year may still be un-tagged, when followed by a unit
      if (term.tags.has(TxtNum) && term.tags.has(Date) && !term.tags.has(Year) && next.tags.has(TxtNum)) {
        add([term, next], Date, 'textvalue-date')
      }
    })
  })
  return pending
}

export default localCorrections
