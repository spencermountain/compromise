import { noop, getTense, haveHas, toPerfectAuxiliary } from '../lib.js'

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
  if (str === 'be' && parsed.negative.has('not')) {
    const have = haveHas(vb, parsed)
    vb.replace(root, have)
    vb.match(parsed.negative).insertAfter('been')
    vb.match(have).tag('Auxiliary')
    return vb
  }
  // 'driven' || 'drove'
  str = all.Participle || all.PastTense

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

const progressive = (vb, parsed) => {
  const have = haveHas(vb, parsed)
  vb.replace('(is|are|am|was|were|will)', have)
  if (vb.has('be')) {
    vb.replace('be', 'been')
  } else {
    vb.match(parsed.root).insertBefore('been')
  }
  vb.match('(have|has|been)').tag('Auxiliary')
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
  'simple-future': (vb, parsed) => {
    const { conjugate, toInfinitive } = vb.methods.two.transform.verb
    const root = toInfinitive(parsed.root.text('normal'), vb.model, getTense(parsed.root))
    const conjugations = conjugate(root, vb.model)
    vb.replace(parsed.root, conjugations.Participle || conjugations.PastTense)
    return vb.replace('will', haveHas(vb, parsed))
  },

  // he is walking
  'present-progressive': progressive,
  // he was walking
  'past-progressive': progressive,
  // he will be walking
  'future-progressive': progressive,

  // has walked -> had walked (?)
  'present-perfect': noop,
  // had walked
  'past-perfect': noop,
  // will have walked -> had walked
  'future-perfect': (vb, parsed) => toPerfectAuxiliary(vb, haveHas(vb, parsed)),

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
  'auxiliary-future': (vb, parsed) => {
    const have = haveHas(vb, parsed)
    vb.replace('(is|are|am|was|were)', have)
    vb.match('going').insertBefore('been')
    vb.match('(have|has|been|going|to|be)').tag('Auxiliary')
    return vb
  },
  // used to walk
  // 'auxiliary-past': noop,
  // we do walk -> we did walk
  // 'auxiliary-present': noop,

  // must walk -> 'must have walked'
  'modal-infinitive': (vb, parsed) => {
    const { conjugate, toInfinitive } = vb.methods.two.transform.verb
    const root = toInfinitive(parsed.root.text('normal'), vb.model, getTense(parsed.root))
    const conjugations = conjugate(root, vb.model)
    vb.match(parsed.root).replaceWith('have ' + (conjugations.Participle || conjugations.PastTense))
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
