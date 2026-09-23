import { inflect } from './inflect.js'
import readAuxiliary from '../parse/auxiliary.js'
import parseVerb from '../parse/index.js'
import { haveHas, isAreAm, wasWere } from '../lib.js'

// Decide the auxiliary chain independently of adverbs and negation.
const plan = function (chain, target, vb, parsed) {
  const { finite, passive, progressive, words } = chain
  let perfect = chain.perfect
  if (target === 'gerund') {
    if (progressive) return words
    return [isAreAm(vb, parsed), 'being']
  }
  if (chain.modal || chain.prospective) {
    if (target === 'participle') {
      if (perfect) return words
      const prefix = words.slice(0, chain.prefixLength)
      const tail = words.slice(chain.prefixLength)
      if (tail[0] === 'be') tail[0] = 'been'
      return [...prefix, 'have', ...tail]
    }
    const head = target === 'past' ? wasWere(vb, parsed) : isAreAm(vb, parsed)
    return [head, ...words.slice(1)]
  }
  if (target === 'present' && /^(has|have|is|are|am)$/.test(finite)) return words
  if (target === 'past' && /^(had|was|were|got)$/.test(finite)) return words
  if (target === 'future' && finite === 'will') return words
  if (target === 'participle') {
    // Existing perfect forms, including past/modal forms, are already complete.
    if (perfect && finite !== 'will') return words
    // Preserve the established future-perfect-progressive no-op.
    if (!passive && chain.form === 'future-perfect-progressive') return words
    perfect = true
    target = 'present'
  }
  // Compatibility: simple future passive has historically become past perfect.
  if (passive && finite === 'will' && target === 'past' && !progressive) {
    perfect = true
  }
  if (finite === 'got' && target === 'past') return words
  if (finite === 'got' && target === 'future') return ['will', 'get']

  const tail = words.slice(finite === 'will' ? 2 : 1)
  if (!passive && progressive && perfect && !chain.perfect) tail.unshift('been')
  if (passive) {
    // Rebuild only the auxiliary layers; the lexical participle is unchanged.
    tail.length = 0
    if (perfect) tail.push('been')
    if (progressive) tail.push('being')
  }
  const base = perfect ? 'have' : 'be'
  if (target === 'future') return ['will', base, ...tail]
  let head
  if (target === 'past') {
    head = perfect ? 'had' : wasWere(vb, parsed)
  } else {
    head = perfect ? haveHas(vb, parsed) : isAreAm(vb, parsed)
  }
  return [head, ...tail]
}

// Align trailing auxiliaries and edit their own views, never lexical words with
// the same spelling. Hardened pointers retain anchors as terms are removed.
const write = function (vb, parsed, words, target, passive) {
  const slots = vb.match(parsed.auxiliary).terms().map(term => ({ view: term.harden() }), []).map(slot => slot.view)
  const root = vb.match(parsed.root).harden()
  const sourceTail = slots.slice(1)
  const targetTail = target.slice(1)
  const overlap = Math.min(sourceTail.length, targetTail.length)

  // Insertions must precede replacements, which can change term IDs.
  const extra = targetTail.slice(0, targetTail.length - overlap)
  if (extra.length > 0) {
    const text = extra.join(' ')
    if (!passive && target[0] === 'will' && target[1] === 'have') {
      // Retain existing active-perfect adverb placement: 'will have really ...'.
      slots[0].toView().insertAfter(text).terms().slice(1).tag('Auxiliary')
    } else {
      const anchor = sourceTail.length > 0 ? sourceTail[0] : root
      anchor.toView().insertBefore(text).terms().slice(0, extra.length).tag('Auxiliary')
    }
  }
  for (let i = 0; i < overlap; i += 1) {
    const sourceIndex = slots.length - 1 - i
    const replacement = target[target.length - 1 - i]
    if (words[sourceIndex] !== replacement) {
      slots[sourceIndex].replaceWith(replacement).tag('Auxiliary')
    }
  }
  for (let i = sourceTail.length - overlap - 1; i >= 0; i -= 1) {
    sourceTail[i].remove()
  }
  if (words[0] !== target[0]) slots[0].replaceWith(target[0]).tag('Auxiliary')
  return vb
}

// Return null for constructions still handled by their existing converters.
const convertAuxiliary = function (vb, parsed, form, target) {
  const chain = readAuxiliary(parsed, form)
  if (!chain) return null
  // Retain existing modal tense policy and the established simple/progressive
  // going-to handlers. New nested going-to forms change only their finite head.
  if (target === 'gerund' && !chain.passive) return null
  if (chain.modal && target !== 'participle' && target !== 'gerund') return null
  if (chain.prospective && !chain.perfect && !chain.passive && form === 'auxiliary-future') return null
  const words = plan(chain, target, vb, parsed)
  if (words.join(' ') === chain.words.join(' ')) return vb
  // .parse() expands contractions on a clone. Expand the live selection only
  // when changing it, then obtain fresh pointers for the writer.
  // A contraction's subject can sit just outside the verb selection ('he'd').
  vb.growLeft('@hasContraction+').contractions().expand()
  const live = parseVerb(vb)
  const root = vb.match(live.root).harden()
  write(vb, live, chain.words, words, chain.passive)
  if (target === 'participle' && chain.modal && !chain.perfect && !chain.passive && !chain.progressive) {
    root.replaceWith(inflect(live.root, 'Participle'))
  }
  vb.fullSentence().compute(['tagger', 'chunks'])
  return vb
}

export default convertAuxiliary
