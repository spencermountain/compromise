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

const hasHad = vb => {
  vb.replace('has', 'had')
  return vb
}

const forms = {
  // he walks -> he walked
  'simple-present': simple,
  // he walked
  'simple-past': noop,
  // he will walk -> he walked
  'simple-future': both,

  // he is walking
  'present-progressive': vb => {
    vb.replace('is', 'was')
    return vb
  },
  // he was walking
  'past-progressive': noop,
  // he will be walking
  'future-progressive': (vb, parsed) => {
    vb.match(parsed.root).insertBefore('was')
    vb.remove('(will|be)')
    return vb
  },

  // has walked -> had walked (?)
  'present-perfect': hasHad,
  // had walked
  'past-perfect': noop,
  // will have walked -> had walked
  'future-perfect': (vb, parsed) => {
    vb.match(parsed.root).insertBefore('had')
    vb.remove('(will|have)')
    return vb
  },

  // has been walking -> had been
  'present-perfect-progressive': hasHad,
  // had been walking
  'past-perfect-progressive': noop,
  // will have been -> had
  'future-perfect-progressive': vb => {
    vb.remove('will')
    vb.replace('have', 'had')
    return vb
  },

  // got walked
  'passive-past': vb => {
    // 'have been walked' -> 'had been walked'
    vb.replace('have', 'had')
    return vb
  },
  // is being walked  -> 'was being walked'
  'passive-present': vb => {
    vb.replace('(is|are)', 'was')
    return vb
  },
  // will be walked -> had been walked
  'passive-future': (vb, parsed) => {
    if (parsed.auxiliary.has('will be')) {
      vb.match(parsed.root).insertBefore('had been')
      vb.remove('(will|be)')
    }
    // will have been walked -> had been walked
    if (parsed.auxiliary.has('will have been')) {
      vb.replace('have', 'had')
      vb.remove('will')
    }
    return vb
  },

  // would be walked -> 'would have been walked'
  'present-conditional': vb => {
    vb.replace('be', 'have been')
    return vb
  },
  // would have been walked
  'past-conditional': noop,

  // is going to drink -> was going to drink
  'auxiliary-future': vb => {
    vb.replace('(is|are|am)', 'was')
    return vb
  },
  // used to walk
  'auxiliary-past': noop,
  // we do walk -> we did walk
  'auxiliary-present': vb => {
    vb.replace('(do|does)', 'did')
    return vb
  },

  // must walk -> 'must have walked'
  'modal-infinitive': (vb, parsed) => {
    simple(vb, parsed)
    vb.match('(can|must|should|shall)').insertAfter('have')
    return vb
  },
  // must have walked
  'modal-past': noop,
  // wanted to walk
  // 'want-infinitive': vb => {
  //   vb.replace('(want|wants)', 'wanted')
  //   return vb
  // },
}

const toPast = function (vb, parsed, form) {
  // console.log(form)
  if (forms.hasOwnProperty(form)) {
    return forms[form](vb, parsed)
  }
  return vb
}
export default toPast
