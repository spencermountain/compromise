import getSubject from '../../parse/subject/index.js'

const noop = vb => vb

const isPlural = (vb, parsed) => {
  let subj = getSubject(vb, parsed)
  let m = subj.subject
  if (m.has('i') || m.has('we')) {
    return true
  }
  return subj.plural
}

// walk->walked
const simple = (vb, parsed) => {
  const { verbConjugate, verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text('normal')
  str = verbToInfinitive(str, vb.model)
  // 'i walk' vs 'he walks'
  if (isPlural(vb, parsed) === false) {
    str = verbConjugate(str, vb.model).PresentTense
  }
  if (str) {
    vb = vb.replace(parsed.root, str)
  }
  return vb
}

const isWasWere = function (vb, parsed) {
  // 'people were' -> 'people are'
  if (vb.has('were')) {
    return vb.replace('were', 'are')
  }
  // 'i was' -> i am
  let subj = getSubject(vb, parsed)
  if (subj.subject.has('i')) {
    return vb.replace('was', 'am')
  }
  // 'he was' -> he is
  return vb.replace('was', 'is')
}

const forms = {
  // he walks -> he walked
  'simple-present': noop,
  // he walked
  'simple-past': simple,
  // he will walk -> he walked
  'simple-future': (vb, parsed) => {
    simple(vb, parsed)
    vb.remove('will')
    return vb
  },

  // is walking ->
  'present-progressive': noop,
  // was walking -> is walking
  'past-progressive': isWasWere,
  // will be walking -> is walking
  'future-progressive': vb => {
    vb.match('will').insertBefore('is')
    vb.remove('be')
    vb.remove('will')
    return vb
  },

  // has walked -> had walked (?)
  'present-perfect': noop,
  // had walked
  'past-perfect': noop,
  // will have walked -> had walked
  'future-perfect': noop,

  // has been walking -> had been
  'present-perfect-progressive': noop,
  // had been walking
  'past-perfect-progressive': noop,
  // will have been -> had
  'future-perfect-progressive': noop,

  // got walked
  'passive-past': noop,
  // is being walked  -> 'was being walked'
  'passive-present': noop,
  // will be walked -> had been walked
  'passive-future': noop,

  // would be walked -> 'would have been walked'
  'present-conditional': noop,
  // would have been walked
  'past-conditional': noop,

  // is going to drink -> was going to drink
  'auxiliary-future': noop,
  // used to walk
  'auxiliary-past': noop,
  // we do walk -> we did walk
  'auxiliary-present': noop,

  // must walk -> 'must have walked'
  'modal-infinitive': noop,
  // must have walked
  'modal-past': noop,
  // wanted to walk
  // 'want-infinitive': vb => {
  //   vb.replace('(want|wants)', 'wanted')
  //   return vb
  // },
}

const toPresent = function (vb, parsed, form) {
  console.log(form)
  if (forms.hasOwnProperty(form)) {
    return forms[form](vb, parsed)
  }
  return vb
}
export default toPresent
