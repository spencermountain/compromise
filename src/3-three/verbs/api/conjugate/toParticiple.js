import { infinitive, inflect } from './inflect.js'
import convertAuxiliary from './auxiliary.js'
import { noop, haveHas } from '../lib.js'

// walk-> has walked
const simple = (vb, parsed) => {
  const { root, auxiliary } = parsed
  // 'i may'
  if (root.has('#Modal')) {
    return vb
  }
  let str = infinitive(root, { keepPunct: false })
  if (str === 'be' && parsed.negative.has('not')) {
    const have = haveHas(vb, parsed)
    vb.replace(root, have)
    vb.match(parsed.negative).insertAfter('been')
    vb.match(have).tag('Auxiliary')
    return vb
  }
  // 'driven' || 'drove'
  str = inflect(root, 'Participle', { keepPunct: false })

  // Replace emphatic do in place, retaining intervening adverbs and negation.
  if (auxiliary.has('(do|does|did)')) {
    const have = haveHas(vb, parsed)
    vb.replace(root, str)
    vb.replace('(do|does|did)', have).match(have).tag('Auxiliary')
    return vb
  }

  if (str) {
    vb = vb.replace(root, str)
    // 'have/had/has eaten'
    const have = haveHas(vb, parsed)
    vb.prepend(have).match(have).tag('Auxiliary')
    vb.remove(auxiliary)
  }

  return vb
}

const forms = {

  // walk -> walked
  'infinitive': simple,

  // he walks -> he walked
  'simple-present': simple,

  // he will walk -> he walked
  'simple-future': (vb, parsed) => {
    vb.replace(parsed.root, inflect(parsed.root, 'Participle'))
    return vb.replace('will', haveHas(vb, parsed))
  },

  // would be walked -> 'would have been walked'
  'present-conditional': vb => vb.replace('be', 'have been'),

  // would have been walked
  'past-conditional': noop,

  // is going to drink -> was going to drink
  'auxiliary-future': (vb, parsed) => {
    const have = haveHas(vb, parsed)
    vb.replace('(is|are|am|was|were)', have)
    vb.match('going').insertBefore('been')
    vb.match('(have|has|been|be)').tag('Auxiliary')
    // The new perfect head governs 'going'; its infinitival complement must
    // remain separate on subsequent conversions, just as on a fresh parse.
    vb.match('going').unTag('Auxiliary').tag('Gerund')
    vb.match('to').unTag('Auxiliary').tag('Conjunction')
    return vb
  },

  // must walk -> 'must have walked'
  'modal-infinitive': (vb, parsed) => {
    vb.match(parsed.root).replaceWith('have ' + inflect(parsed.root, 'Participle'))
    vb.match('have').tag('Auxiliary')
    return vb
  },

  // must have walked
  'modal-past': noop,
  'modal-perfect-progressive': noop,
  // wanted to walk
  // 'want-infinitive': noop,
  // started looking
  // 'gerund-phrase': noop,
}

const toParticiple = function (vb, parsed, form) {
  const converted = convertAuxiliary(vb, parsed, form, 'participle')
  if (converted) return converted
  // console.log(form)
  if (forms.hasOwnProperty(form)) {
    vb = forms[form](vb, parsed)
    vb.fullSentence().compute(['tagger', 'chunks'])
    return vb
  }
  // do the simple form
  vb = simple(vb, parsed, form)
  vb.fullSentence().compute(['tagger', 'chunks'])
  // do nothing, then
  return vb
}
export default toParticiple
