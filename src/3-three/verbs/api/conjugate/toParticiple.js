import { Participle, Ger, Conj, Aux } from '../../../../2-two/preTagger/tagSet/_lib.js'
import { infinitive, inflect } from './inflect.js'
import byForm from './_lib.js'
import { noop, haveHas } from '../lib.js'
import { SimplePres, SimpleFut, PresCond, PastCond, AuxFut, ModalPast, ModalInf, ModalPerfProg, InfForm } from '../parse/grammar/forms.js'

// walk-> has walked
const simple = (vb, parsed) => {
  const { root, auxiliary } = parsed
  // 'i may'
  if (root.has('#Mod')) {
    return vb
  }
  let str = infinitive(root, { keepPunct: false })
  if (str === 'be' && parsed.negative.has('not')) {
    const have = haveHas(vb, parsed)
    vb.replace(root, have)
    vb.match(parsed.negative).insertAfter('been')
    vb.match(have).tag(Aux)
    return vb
  }
  // 'driven' || 'drove'
  str = inflect(root, Participle, { keepPunct: false })

  // Replace emphatic do in place, retaining intervening adverbs and negation.
  if (auxiliary.has('(do|does|did)')) {
    const have = haveHas(vb, parsed)
    vb.replace(root, str)
    vb.replace('(do|does|did)', have).match(have).tag(Aux)
    return vb
  }

  if (str) {
    vb = vb.replace(root, str)
    // 'have/had/has eaten'
    const have = haveHas(vb, parsed)
    vb.prepend(have).match(have).tag(Aux)
    vb.remove(auxiliary)
  }

  return vb
}

const forms = {

  // walk -> walked
  [InfForm]: simple,

  // he walks -> he walked
  [SimplePres]: simple,

  // he will walk -> he walked
  [SimpleFut]: (vb, parsed) => {
    vb.replace(parsed.root, inflect(parsed.root, Participle))
    return vb.replace('will', haveHas(vb, parsed))
  },

  // would be walked -> 'would have been walked'
  [PresCond]: vb => vb.replace('be', 'have been'),

  // would have been walked
  [PastCond]: noop,

  // is going to drink -> was going to drink
  [AuxFut]: (vb, parsed) => {
    const have = haveHas(vb, parsed)
    vb.replace('(is|are|am|was|were)', have)
    vb.match('going').insertBefore('been')
    vb.match('(have|has|been|be)').tag(Aux)
    // The new perfect head governs 'going'; its infinitival complement must
    // remain separate on subsequent conversions, just as on a fresh parse.
    vb.match('going').unTag(Aux).tag(Ger)
    vb.match('to').unTag(Aux).tag(Conj)
    return vb
  },

  // must walk -> 'must have walked'
  [ModalInf]: (vb, parsed) => {
    vb.match(parsed.root).replaceWith('have ' + inflect(parsed.root, Participle))
    vb.match('have').tag(Aux)
    return vb
  },

  // must have walked
  [ModalPast]: noop,
  [ModalPerfProg]: noop,
  // wanted to walk
  // 'want-infinitive': noop,
  // started looking
  // 'gerund-phrase': noop,
}

// do the simple form, if nothing else
const toParticiple = byForm('participle', forms, simple)
export default toParticiple
