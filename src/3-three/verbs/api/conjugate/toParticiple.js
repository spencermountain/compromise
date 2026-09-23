import { noop, getTense, getSubject } from '../lib.js'

const haveHas = function (vb, parsed) {
  const subj = getSubject(vb, parsed)
  const m = subj.subject
  if (m.has('(i|we|you)')) {
    return 'have'
  }
  // the dog has
  if (subj.plural === false) {
    return 'has'
  }
  // spencer has
  if (m.has('he') || m.has('she') || m.has('#Person')) {
    return 'has'
  }
  return 'have'
}

// walk-> has walked
const simple = (vb, parsed) => {
  const { conjugate, toInfinitive } = vb.methods.two.transform.verb
  const { root, auxiliary } = parsed
  // 'i may'
  if (root.has('#Modal')) {
    return vb
  }
  let str = root.text({ keepPunct: false })
  str = toInfinitive(str, vb.model, getTense(root))
  const all = conjugate(str, vb.model)
  // 'driven' || 'drove'
  str = all.Participle || all.PastTense

  if (str) {
    vb = vb.replace(root, str)
    // 'have/had/has eaten'
    const have = haveHas(vb, parsed)
    vb.prepend(have).match(have).tag('Auxiliary')
    vb.remove(auxiliary)
  }

  return vb
}



// Keep the passive participle and any progressive 'being'.
const passive = (vb, parsed) => {
  if (parsed.auxiliary.has('(have|has|had)')) {
    return vb
  }
  const have = haveHas(vb, parsed)
  vb.replace('(is|are|am|was|were|got)', have)
  const being = vb.match('being')
  if (being.found) {
    being.insertBefore('been')
  } else {
    vb.match(parsed.root).insertBefore('been')
  }
  vb.match('been').tag('Auxiliary')
  return vb
}

const forms = {
  // walk -> walked
  'infinitive': simple,
  // he walks -> he walked
  'simple-present': simple,
  // he walked
  // 'simple-past': noop,
  // he will walk -> he walked
  'simple-future': (vb, parsed) => vb.replace('will', haveHas(vb, parsed)),

  // he is walking
  // 'present-progressive': noop,
  // he was walking
  // 'past-progressive': noop,
  // he will be walking
  // 'future-progressive': noop,

  // has walked -> had walked (?)
  'present-perfect': noop,
  // had walked
  'past-perfect': noop,
  // will have walked -> had walked
  'future-perfect': (vb, parsed) => vb.replace('will have', haveHas(vb, parsed)),

  // has been walking -> had been
  'present-perfect-progressive': noop,
  // had been walking
  'past-perfect-progressive': noop,
  // will have been -> had
  'future-perfect-progressive': noop,

  // got walked -> has been walked
  'passive-past': passive,
  // is being walked -> has been being walked
  'passive-present': passive,
  // will be walked -> has been walked
  'passive-future': (vb, parsed) => {
    const have = haveHas(vb, parsed)
    if (parsed.auxiliary.has('have')) {
      vb.remove('have')
      return vb.replace('will', have)
    }
    vb.replace('will', have)
    vb.replace('be', 'been')
    vb.match('been').tag('Auxiliary')
    return vb
  },

  // would be walked -> 'would have been walked'
  'present-conditional': vb => vb.replace('be', 'have been'),
  // would have been walked
  'past-conditional': noop,

  // is going to drink -> was going to drink
  // 'auxiliary-future': noop,
  // used to walk
  // 'auxiliary-past': noop,
  // we do walk -> we did walk
  // 'auxiliary-present': noop,

  // must walk -> 'must have walked'
  // 'modal-infinitive': noop,
  // must have walked
  // 'modal-past': noop,
  // wanted to walk
  // 'want-infinitive': noop,
  // started looking
  // 'gerund-phrase': noop,
}

const toParticiple = function (vb, parsed, form) {
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
