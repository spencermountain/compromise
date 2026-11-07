import { infinitive } from './inflect.js'
import { doDoes, isAreAm, retag } from '../lib.js'
import parseVerb from '../parse/index.js'
import { Vb, Inf } from '../../../../2-two/preTagger/tagSet/_lib.js'
import { keepTags as keep } from '../../../_lib.js'

// all verb forms are the same
const toInf = function (vb, parsed) {
  vb.growLeft('@hasContraction+').contractions().expand()
  parsed = parseVerb(vb)
  const { root, auxiliary } = parsed
  const aux = auxiliary.terms().harden()
  const str = infinitive(root)
  // Like negative lexical verbs ('does not walk'), keep an agreeing finite
  // negative copula. English does not use do-support for 'be'.
  if (str === 'be' && parsed.negative.found) {
    const copula = isAreAm(vb, parsed)
    if (aux.found) {
      vb.remove(root)
      vb.match(aux).firstTerm().replaceWith(copula)
      vb.remove(aux.slice(1))
    } else {
      vb.replace(root, copula)
    }
    retag(vb)
    return vb
  }
  if (str) {
    vb.replace(root, str, keep).tag(Vb).firstTerm().tag(Inf)
  }
  // remove any auxiliary terms
  if (aux.found) {
    vb.remove(aux)
  }
  // there is no real way to do this
  // 'i not walk'?  'i walk not'?
  // 'never' negates the infinitive on its own - 'i never walk'
  if (parsed.negative.found && !vb.has('never')) {
    if (!vb.has('not')) {
      vb.prepend('not')
    }
    const does = doDoes(vb, parsed)
    vb.prepend(does)
  }
  vb.fullSentence().compute(['freeze', 'lexicon', 'preTagger', 'postTagger', 'unfreeze', 'chunks'])
  return vb
}
export default toInf
