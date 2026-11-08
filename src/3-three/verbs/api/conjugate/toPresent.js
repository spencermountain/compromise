import { Pres, Inf, Ger, Aux } from '../../../../2-two/preTagger/tagSet/_lib.js'
import { infinitive, inflect } from './inflect.js'
import byForm from './_lib.js'
import { noop, isPlural, isAreAm, doDoes, getSubject } from '../lib.js'
import { keepTags as keep } from '../../../_lib.js'
import { WantInf, GerPhrase, SimplePres, SimplePast, SimpleFut, PresCond, PastCond, AuxFut, AuxPast, AuxPres, ModalPast, ModalInf, InfForm } from '../parse/grammar/forms.js'

// walk->walked
const simple = (vb, parsed) => {
  const root = parsed.root
  let str = infinitive(root)
  // 'i walk' vs 'he walks'
  const plural = isPlural(vb, parsed)
  if (!plural) {
    str = inflect(root, Pres)
  }
  // handle copula
  if (root.has('#Cop')) {
    str = isAreAm(vb, parsed)
  }
  if (str) {
    vb = vb.replace(root, str, keep)
    if (!plural) vb.not('#Particle').unTag(Inf)
    vb.not('#Particle').tag(Pres)
  }
  // vb.replace('not ' + str, str + ' not')
  return vb
}

const toGerund = (vb, parsed) => {
  const root = parsed.root
  const str = inflect(root, Ger)
  if (str) {
    vb = vb.replace(root, str, keep)
    vb.not('#Particle').tag(Ger)
  }
  return vb
}

const forms = {

  // walk
  [InfForm]: simple,

  // he walks -> he walked
  [SimplePres]: (vb, parsed) => {
    const { conjugate } = vb.methods.two.transform.verb
    const { root } = parsed
    // is it *only* a infinitive? - 'we buy' etc
    if (root.has('#Inf')) {
      const subj = getSubject(vb, parsed)
      const m = subj.subject
      if (isPlural(vb, parsed) || m.has('i')) {
        // keep it infinitive
        return vb
      }
      const str = root.text('normal')
      const pres = conjugate(str, vb.model).PresentTense
      if (str !== pres) {
        vb.replace(root, pres, keep).not('#Particle').unTag(Inf).tag(Pres)
      }
    } else {
      return simple(vb, parsed)
    }
    return vb
  },

  // he walked
  [SimplePast]: simple,

  // he will walk -> he walked
  [SimpleFut]: (vb, parsed) => {
    const { root, auxiliary } = parsed
    // handle 'will be'
    if (auxiliary.has('will') && root.has('be')) {
      const str = isAreAm(vb, parsed)
      vb.replace(root, str)
      vb = vb.remove('will')
      vb.replace('not ' + str, str + ' not')
    } else if (parsed.negative.found) {
      vb.replace('will', doDoes(vb, parsed)).match('(do|does)').tag(Aux)
    } else {
      simple(vb, parsed)
      vb = vb.remove('will')
    }
    return vb
  },

  // would be walked ->
  [PresCond]: noop,

  // would have been walked ->
  [PastCond]: vb => {
    vb.replace('been', 'be')
    return vb.remove('have')
  },

  // is going to drink -> is drinking
  [AuxFut]: (vb, parsed) => {
    const copula = isAreAm(vb, parsed)
    vb.replace('(was|were)', copula)
    if (parsed.root.has('#Ger') && vb.has('going to be')) {
      vb.remove('going to be')
      return vb
    }
    toGerund(vb, parsed)
    vb.remove('(going|to)')
    return vb
  },

  // did walk -> is walking
  [AuxPast]: (vb, parsed) => {
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
  [AuxPres]: noop,

  // must walk -> 'must have walked'
  [ModalInf]: noop,

  // must have walked
  [ModalPast]: (vb, parsed) => {
    const str = infinitive(parsed.root)
    if (str) {
      vb.replace(parsed.root, str, keep)
    }
    return vb.remove('have')
  },

  // started looking
  [GerPhrase]: (vb, parsed) => {
    parsed.root = parsed.root.not('#Ger$')
    simple(vb, parsed)
    return vb.remove('(will|have)')
  },

  // wanted to walk
  [WantInf]: (vb, parsed) => {
    let str = 'wants'
    if (isPlural(vb, parsed)) {
      str = 'want'//we want
    }
    vb.replace('(want|wanted|wants)', str, keep)
    vb.remove('will')
    return vb
  },
}

const toPresent = byForm('present', forms)
export default toPresent
