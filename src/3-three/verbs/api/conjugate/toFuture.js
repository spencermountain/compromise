import { noop, getTense } from '../lib.js'
const keep = { tags: true }

const simple = (vb, parsed) => {
  const { toInfinitive } = vb.methods.two.transform.verb
  const { root, auxiliary } = parsed
  // 'i may'
  if (root.has('#Modal')) {
    return vb
  }
  let str = root.text('normal')
  str = toInfinitive(str, vb.model, getTense(root))
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

// 'will be walking'
const progressive = (vb, parsed) => {
  const { conjugate, toInfinitive } = vb.methods.two.transform.verb
  const { root, auxiliary } = parsed
  let str = root.text('normal')
  str = toInfinitive(str, vb.model, getTense(root))
  if (str) {
    str = conjugate(str, vb.model).Gerund
    vb.replace(root, str, keep)
    vb.not('#Particle').tag('PresentTense')
  }
  vb.remove(auxiliary)
  vb.prepend('will be').match('will be').tag('Auxiliary')
  return vb
}

// Change the finite auxiliary without dropping passive or progressive aspect.
const passive = (vb, parsed) => {
  const finite = vb.match('(is|are|am|was|were|has|have|had)').first()
  if (!finite.found) {
    return vb
  }
  const perfect = finite.has('(has|have|had)')
  finite.replaceWith('will')
  const next = vb.match('(being|been)').first()
  if (next.found) {
    next.insertBefore(perfect ? 'have' : 'be')
  } else {
    vb.match(parsed.root).insertBefore('be')
  }
  vb.match('(will|have|be)').tag('Auxiliary')
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

  // is walking ->
  'present-progressive': progressive,
  // was walking ->
  'past-progressive': progressive,
  // will be walking ->
  'future-progressive': noop,

  // has walked ->
  'present-perfect': (vb) => {
    vb.match('(have|has)').replaceWith('will have')
    return vb
  },
  // had walked ->
  'past-perfect': vb => vb.replace('(had|has)', 'will have'),
  // will have walked ->
  'future-perfect': noop,

  // has been walking
  'present-perfect-progressive': vb => vb.replace('(has|have)', 'will have'),
  // had been walking
  'past-perfect-progressive': vb => vb.replace('had', 'will have'),
  // will have been ->
  'future-perfect-progressive': noop,

  // got walked ->
  // was walked ->
  // was being walked ->
  // had been walked ->
  'passive-past': (vb, parsed) => {
    if (vb.has('got')) {
      return vb.replace('got', 'will get')
    }
    return passive(vb, parsed)
  },
  // is being walked  ->
  'passive-present': passive,
  // will be walked ->
  'passive-future': noop,
  // would be walked ->
  'present-conditional': vb => vb.replace('would', 'will'),
  // would have been walked ->
  'past-conditional': vb => vb.replace('would', 'will'),

  // is going to drink ->
  'auxiliary-future': noop,
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
  // console.log(form)
  // is it already future-tense?
  if (vb.has('will') || vb.has('going to')) {
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
