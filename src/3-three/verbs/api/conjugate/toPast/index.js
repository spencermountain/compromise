const noop = vb => vb

const noAux = (vb, parsed) => {
  if (parsed.auxiliary.found) {
    vb = vb.remove(parsed.auxiliary)
  }
  return vb
}

// walk->walked
const simple = (vb, parsed) => {
  const { verbConjugate, verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text('normal')
  str = verbToInfinitive(str, vb.model)
  str = verbConjugate(str, vb.model).PastTense
  if (str) {
    vb = vb.replace(parsed.root, str)
  }
  return vb
}

const both = function (vb, parsed) {
  vb = simple(vb, parsed)
  return noAux(vb, parsed)
}

const forms = {
  // he walks -> he walked
  'simple-present': simple,
  // he walked
  'simple-past': noop,
  // he will walk -> he walked
  'simple-future': both,

  // he is walking
  'present-progressive': both,
  // he was walking
  'past-progressive': both,
  // he will be walking
  'future-progressive': both,

  'present-perfect': () => {},
  'past-perfect': () => {},
  'future-perfect': () => {},

  'present-perfect-progressive': () => {},
  'past-perfect-progressive': () => {},
  'future-perfect-progressive': () => {},

  'passive-past': noop,
  'passive-present': () => {},
  'passive-future': () => {},

  'present-conditional': () => {},
  'past-conditional': () => {},

  'auxiliary-future': () => {},
  'auxiliary-past': noop,
  'auxiliary-present': () => {},
  'modal-infinitive': () => {},
  'modal-past': noop,
  'want-infinitive': () => {},
}

const toPast = function (vb, parsed, info) {
  if (forms.hasOwnProperty(info)) {
    return forms[info](vb, parsed)
  }
  return vb
}
export default toPast
