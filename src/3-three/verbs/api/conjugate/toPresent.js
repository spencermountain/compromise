import convertAuxiliary from './auxiliary.js'
import { noop, isPlural, isAreAm, doDoes, getSubject, getTense } from '../lib.js'
const keep = { tags: true }

// walk->walked
const simple = (vb, parsed) => {
  const { conjugate, toInfinitive } = vb.methods.two.transform.verb
  const root = parsed.root
  let str = root.text('normal')
  str = toInfinitive(str, vb.model, getTense(root))
  // 'i walk' vs 'he walks'
  if (isPlural(vb, parsed) === false) {
    str = conjugate(str, vb.model).PresentTense
  }
  // handle copula
  if (root.has('#Copula')) {
    str = isAreAm(vb, parsed)
  }
  if (str) {
    vb = vb.replace(root, str, keep)
    vb.not('#Particle').tag('PresentTense')
  }
  // vb.replace('not ' + str, str + ' not')
  return vb
}

const toGerund = (vb, parsed) => {
  const { conjugate, toInfinitive } = vb.methods.two.transform.verb
  const root = parsed.root
  let str = root.text('normal')
  str = toInfinitive(str, vb.model, getTense(root))
  str = conjugate(str, vb.model).Gerund
  if (str) {
    vb = vb.replace(root, str, keep)
    vb.not('#Particle').tag('Gerund')
  }
  return vb
}

const vbToInf = (vb, parsed) => {
  const { toInfinitive } = vb.methods.two.transform.verb
  const root = parsed.root
  let str = parsed.root.text('normal')
  str = toInfinitive(str, vb.model, getTense(root))
  if (str) {
    vb = vb.replace(parsed.root, str, keep)
  }
  return vb
}



const forms = {

  // walk
  'infinitive': simple,

  // he walks -> he walked
  'simple-present': (vb, parsed) => {
    const { conjugate } = vb.methods.two.transform.verb
    const { root } = parsed
    // is it *only* a infinitive? - 'we buy' etc
    if (root.has('#Infinitive')) {
      const subj = getSubject(vb, parsed)
      const m = subj.subject
      if (isPlural(vb, parsed) || m.has('i')) {
        // keep it infinitive
        return vb
      }
      const str = root.text('normal')
      const pres = conjugate(str, vb.model).PresentTense
      if (str !== pres) {
        vb.replace(root, pres, keep)
      }
    } else {
      return simple(vb, parsed)
    }
    return vb
  },

  // he walked
  'simple-past': simple,

  // he will walk -> he walked
  'simple-future': (vb, parsed) => {
    const { root, auxiliary } = parsed
    // handle 'will be'
    if (auxiliary.has('will') && root.has('be')) {
      const str = isAreAm(vb, parsed)
      vb.replace(root, str)
      vb = vb.remove('will')
      vb.replace('not ' + str, str + ' not')
    } else if (parsed.negative.found) {
      vb.replace('will', doDoes(vb, parsed)).match('(do|does)').tag('Auxiliary')
    } else {
      simple(vb, parsed)
      vb = vb.remove('will')
    }
    return vb
  },

  // is walking ->
  'present-progressive': noop,

  // was walking -> is walking
  'past-progressive': (vb, parsed) => {
    const str = isAreAm(vb, parsed)
    return vb.replace('(were|was)', str, keep)
  },

  // will be walking -> is walking
  'future-progressive': (vb, parsed) => {
    vb.replace('will', isAreAm(vb, parsed), keep)
    return vb.remove('be')
  },

  // would be walked ->
  'present-conditional': noop,

  // would have been walked ->
  'past-conditional': vb => {
    vb.replace('been', 'be')
    return vb.remove('have')
  },

  // is going to drink -> is drinking
  'auxiliary-future': (vb, parsed) => {
    const copula = isAreAm(vb, parsed)
    vb.replace('(was|were)', copula)
    if (parsed.root.has('#Gerund') && vb.has('going to be')) {
      vb.remove('going to be')
      return vb
    }
    toGerund(vb, parsed)
    vb.remove('(going|to)')
    return vb
  },

  // did walk -> is walking
  'auxiliary-past': (vb, parsed) => {
    // 'did provide' -> 'does provide'
    if (parsed.auxiliary.has('did')) {
      const str = doDoes(vb, parsed)
      vb.replace(parsed.auxiliary, str)
      return vb
    }
    toGerund(vb, parsed)
    vb.replace(parsed.auxiliary, 'is')
    return vb
  },

  // we do walk ->
  'auxiliary-present': noop,

  // must walk -> 'must have walked'
  'modal-infinitive': noop,

  // must have walked
  'modal-past': (vb, parsed) => {
    vbToInf(vb, parsed)
    return vb.remove('have')
  },

  // started looking
  'gerund-phrase': (vb, parsed) => {
    parsed.root = parsed.root.not('#Gerund$')
    simple(vb, parsed)
    return vb.remove('(will|have)')
  },

  // wanted to walk
  'want-infinitive': (vb, parsed) => {
    let str = 'wants'
    if (isPlural(vb, parsed)) {
      str = 'want'//we want
    }
    vb.replace('(want|wanted|wants)', str, keep)
    vb.remove('will')
    return vb
  },
}

const toPresent = function (vb, parsed, form) {
  const converted = convertAuxiliary(vb, parsed, form, 'present')
  if (converted) return converted
  // console.log(form)
  if (forms.hasOwnProperty(form)) {
    vb = forms[form](vb, parsed)
    vb.fullSentence().compute(['tagger', 'chunks'])
    return vb
  }
  return vb
}
export default toPresent
