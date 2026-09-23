import { doDoes, getTense, isAreAm } from '../lib.js'
import parseVerb from '../parse/index.js'
const keep = { tags: true }

// all verb forms are the same
const toInf = function (vb, parsed) {
  const { toInfinitive } = vb.methods.two.transform.verb
  vb.growLeft('@hasContraction+').contractions().expand()
  parsed = parseVerb(vb)
  const { root, auxiliary } = parsed
  const aux = auxiliary.terms().harden()
  let str = root.text('normal')
  str = toInfinitive(str, vb.model, getTense(root))
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
    vb.fullSentence().compute(['tagger', 'chunks'])
    return vb
  }
  if (str) {
    vb.replace(root, str, keep).tag('Verb').firstTerm().tag('Infinitive')
  }
  // remove any auxiliary terms
  if (aux.found) {
    vb.remove(aux)
  }
  // there is no real way to do this
  // 'i not walk'?  'i walk not'?
  if (parsed.negative.found) {
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
