//non-specifc, 'hail-mary' transforms from infinitive, into other forms
const hasY = /[bcdfghjklmnpqrstvwxz]y$/

const generic = {
  Gerund: inf => {
    if (inf.charAt(inf.length - 1) === 'e') {
      return inf.replace(/e$/, 'ing')
    }
    return inf + 'ing'
  },

  PresentTense: inf => {
    if (inf.charAt(inf.length - 1) === 's') {
      return inf + 'es'
    }
    if (hasY.test(inf) === true) {
      return inf.slice(0, -1) + 'ies'
    }
    return inf + 's'
  },

  PastTense: inf => {
    if (inf.charAt(inf.length - 1) === 'e') {
      return inf + 'd'
    }
    if (inf.substr(-2) === 'ed') {
      return inf
    }
    if (hasY.test(inf) === true) {
      return inf.slice(0, -1) + 'ied'
    }
    return inf + 'ed'
  },
}

module.exports = generic
