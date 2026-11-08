import { inflect } from './inflect.js'
import byForm from './_lib.js'
import { noop, wasWere, noWill } from '../lib.js'
import { Past, Participle, Aux } from '../../../../2-two/preTagger/tagSet/_lib.js'
import { keepTags as keep } from '../../../_lib.js'
import { WantInf, GerPhrase, SimplePres, SimplePast, SimpleFut, PresCond, PastCond, AuxFut, AuxPast, AuxPres, ModalPast, ModalInf, InfForm } from '../parse/grammar/forms.js'

const fns = {

  noAux: (vb, parsed) => {
    if (parsed.auxiliary.found) {
      vb = vb.remove(parsed.auxiliary)
    }
    return vb
  },

  // walk->walked
  simple: (vb, parsed) => {
    const root = parsed.root
    // 'i may'
    if (root.has('#Mod')) {
      return vb
    }
    let str = inflect(root, Past, { keepPunct: false })
    // but skip the 'is' participle..
    str = str === 'been' ? 'was' : str
    if (str === 'was') {
      str = wasWere(vb, parsed)
    }
    if (str) {
      vb.replace(root, str, keep)
    }
    return vb
  },

  both: function (vb, parsed) {
    if (parsed.root.has('be')) {
      vb.replace('will', wasWere(vb, parsed))
      return vb.remove('be')
    }
    // 'he did not walk'
    if (parsed.negative.found) {
      vb.replace('will', 'did')
      return vb
    }
    // 'he walked'
    vb = fns.simple(vb, parsed)
    vb = fns.noAux(vb, parsed)
    return vb
  },

}

const forms = {

  // walk -> walked
  [InfForm]: fns.simple,

  // he walks -> he walked
  [SimplePres]: fns.simple,

  // he walked
  [SimplePast]: noop,

  // he will walk -> he walked
  [SimpleFut]: fns.both,

  // would be walked -> 'would have been walked'
  [PresCond]: vb => {
    vb.replace('be', 'have been')
    return vb
  },

  // would have been walked
  [PastCond]: noop,

  // is going to drink -> was going to drink
  [AuxFut]: (vb, parsed) => {
    vb.replace('(is|are|am)', wasWere(vb, parsed), keep)
    return vb
  },

  // used to walk
  [AuxPast]: noop,

  // we do walk -> we did walk
  [AuxPres]: vb => {
    vb.replace('(do|does)', 'did', keep)
    return vb
  },

  // must walk -> 'must have walked'
  [ModalInf]: (vb, parsed) => {
    // this modal has a clear tense
    if (vb.has('can')) {
      // can drive -> could drive
      vb.replace('can', 'could', keep)
    } else {
      // otherwise, 
      //  walk -> have walked
      //  drive -> have driven
      vb.match(parsed.root).replaceWith('have ' + inflect(parsed.root, Participle))
      vb.match('have').tag(Aux)
    }
    return vb
  },

  // must have walked
  [ModalPast]: noop,

  // wanted to walk
  [WantInf]: vb => {
    vb.replace('(want|wants)', 'wanted', keep)
    vb.remove('will')
    return vb
  },

  // started looking
  [GerPhrase]: (vb, parsed) => {
    parsed.root = parsed.root.not('#Ger$')
    fns.simple(vb, parsed)
    noWill(vb)
    return vb
  },
}

const toPast = byForm('past', forms)
export default toPast
