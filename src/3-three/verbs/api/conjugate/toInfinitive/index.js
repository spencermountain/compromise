// walk->walked
const simple = (vb, parsed) => {
  const { verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text('normal')
  str = verbToInfinitive(str, vb.model)
  if (str) {
    vb = vb.replace(parsed.root, str)
  }
  if (parsed.auxiliary.found) {
    vb = vb.remove(parsed.auxiliary)
  }
  return vb
}

const forms = {
  // he walks -> he walked
  'simple-present': simple,
  // he walked
  'simple-past': simple,
  // he will walk -> he walked
  'simple-future': simple,

  // he is walking
  'present-progressive': simple,
  // he was walking
  'past-progressive': simple,
  // he will be walking
  'future-progressive': simple,

  // has walked -> had walked (?)
  'present-perfect': simple,
  // had walked
  'past-perfect': simple,
  // will have walked -> had walked
  'future-perfect': simple,

  // has been walking -> had been
  'present-perfect-progressive': simple,
  // had been walking
  'past-perfect-progressive': simple,
  // will have been -> had
  'future-perfect-progressive': simple,

  // got walked
  'passive-past': simple,
  // is being walked  -> 'was being walked'
  'passive-present': simple,
  // will be walked -> had been walked
  'passive-future': simple,

  // would be walked -> 'would have been walked'
  'present-conditional': simple,
  // would have been walked
  'past-conditional': simple,

  // is going to drink -> was going to drink
  'auxiliary-future': simple,
  // used to walk
  'auxiliary-past': simple,
  // we do walk -> we did walk
  'auxiliary-present': simple,

  // must walk -> 'must have walked'
  'modal-infinitive': simple,
  // must have walked
  'modal-past': simple,
  // wanted to walk
  // 'want-infinitive': vb => {
  //   vb.replace('(want|wants)', 'wanted')
  //   return vb
  // },
}

const toPresent = function (vb, parsed, form) {
  // console.log(form)
  if (forms.hasOwnProperty(form)) {
    return forms[form](vb, parsed)
  }
  return vb
}
export default toPresent
