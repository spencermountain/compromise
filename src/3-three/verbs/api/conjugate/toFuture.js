import { infinitive } from './inflect.js'
import convertAuxiliary from './auxiliary.js'
import { noop, isAreAm } from '../lib.js'
const keep = { tags: true }

const simple = (vb, parsed) => {
  const { root, auxiliary } = parsed
  // 'i may'
  if (root.has('#Modal')) {
    return vb
  }
  const str = infinitive(root)
  if (str === 'be' && parsed.negative.has('not')) {
    vb.replace(root, 'will')
    vb.match(parsed.negative).insertAfter('be')
    return vb
  }
  if (str) {
    vb = vb.replace(root, str, keep)
    vb.not('#Particle').tag('Verb')
  }
  vb.prepend('will').match('will').tag('Auxiliary')
  vb.remove(auxiliary)
  return vb
}

const forms = {
  // walk ->
  'infinitive': simple,
  // he walks ->
  'simple-present': simple,
  // he walked
  'simple-past': simple,
  // he will walk ->
  'simple-future': noop,

  // would be walked ->
  'present-conditional': vb => vb.replace('would', 'will'),
  // would have been walked ->
  'past-conditional': vb => vb.replace('would', 'will'),

  // is going to drink ->
  'auxiliary-future': (vb, parsed) => vb.replace('(was|were)', isAreAm(vb, parsed)),
  // used to walk -> is walking
  // did walk -> is walking
  'auxiliary-past': vb => {
    if (vb.has('used') && vb.has('to')) {
      vb.replace('used', 'will')
      return vb.remove('to')
    }
    vb.replace('did', 'will')
    return vb
  },
  // we do walk ->
  // he does walk ->
  'auxiliary-present': vb => {
    return vb.replace('(do|does)', 'will')
  },

  // must walk ->
  'modal-infinitive': noop,
  // must have walked
  'modal-past': noop,
  // started looking
  'gerund-phrase': (vb, parsed) => {
    parsed.root = parsed.root.not('#Gerund$')
    simple(vb, parsed)
    return vb.remove('(had|have)')
  },
  // wanted to walk
  'want-infinitive': vb => {
    vb.replace('(want|wants|wanted)', 'will want')
    return vb
  },
}

const toFuture = function (vb, parsed, form) {
  const converted = convertAuxiliary(vb, parsed, form, 'future')
  if (converted) return converted
  // console.log(form)
  // is it already future-tense?
  if (vb.has('will')) {
    return vb
  }
  if (forms.hasOwnProperty(form)) {
    vb = forms[form](vb, parsed)
    vb.fullSentence().compute(['tagger', 'chunks'])
    return vb
  }
  return vb
}
export default toFuture
