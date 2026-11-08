import { infinitive } from './inflect.js'
import byForm from './_lib.js'
import { noop, isAreAm } from '../lib.js'
import { Vb, Aux } from '../../../../2-two/preTagger/tagSet/_lib.js'
import { keepTags as keep } from '../../../_lib.js'
import { WantInf, GerPhrase, SimplePres, SimplePast, SimpleFut, PresCond, PastCond, AuxFut, AuxPast, AuxPres, ModalPast, ModalInf, InfForm } from '../parse/grammar/forms.js'

const simple = (vb, parsed) => {
  const { root, auxiliary } = parsed
  // 'i may'
  if (root.has('#Mod')) {
    return vb
  }
  const str = infinitive(root)
  if (str === 'be' && parsed.negative.has('not')) {
    vb.replace(root, 'will')
    vb.match(parsed.negative).insertAfter('be')
    return vb
  }
  if (str) {
    vb = vb.replace(root, str, keep)
    vb.not('#Particle').tag(Vb)
  }
  vb.prepend('will').match('will').tag(Aux)
  vb.remove(auxiliary)
  return vb
}

const wouldWill = vb => vb.replace('would', 'will')

const forms = {
  // walk ->
  [InfForm]: simple,
  // he walks ->
  [SimplePres]: simple,
  // he walked
  [SimplePast]: simple,
  // he will walk ->
  [SimpleFut]: noop,

  // would be walked ->
  [PresCond]: wouldWill,
  // would have been walked ->
  [PastCond]: wouldWill,

  // is going to drink ->
  [AuxFut]: (vb, parsed) => vb.replace('(was|were)', isAreAm(vb, parsed)),
  // used to walk -> is walking
  // did walk -> is walking
  [AuxPast]: vb => {
    if (vb.has('used') && vb.has('to')) {
      vb.replace('used', 'will')
      return vb.remove('to')
    }
    vb.replace('did', 'will')
    return vb
  },
  // we do walk ->
  // he does walk ->
  [AuxPres]: vb => {
    return vb.replace('(do|does)', 'will')
  },

  // must walk ->
  [ModalInf]: noop,
  // must have walked
  [ModalPast]: noop,
  // started looking
  [GerPhrase]: (vb, parsed) => {
    parsed.root = parsed.root.not('#Ger$')
    simple(vb, parsed)
    return vb.remove('(had|have)')
  },
  // wanted to walk
  [WantInf]: vb => {
    vb.replace('(want|wants|wanted)', 'will want')
    return vb
  },
}

// is it already future-tense?
const toFuture = byForm('future', forms, null, vb => vb.has('will'))
export default toFuture
