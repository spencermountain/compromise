import swapVerb from './swap-verb.js'

const swapNoun = function (m, lemma) {
  let str = lemma
  if (m.has('#Plural')) {
    const toPlural = m.methods.two.transform.nounToPlural
    str = toPlural(lemma, m.model)
  }
  m.replaceWith(str)
}

const swapAdverb = function (m, lemma) {
  const toAdverb = m.methods.two.transform.adjToAdverb
  let str = lemma
  let adv = toAdverb(str)
  if (adv) {
    m.replaceWith(adv)
  }
}

const swap = function (from, to, tag) {
  let m = this.match(`{${from}}`)
  // guard against some homonyms
  if (tag) {
    m = m.if(tag)
  }
  if (m.has('#Verb')) {
    return swapVerb(m, to)
  }
  if (m.has('#Noun')) {
    return swapNoun(m, to)
  }
  if (m.has('#Adverb')) {
    return swapAdverb(m, to)
  }
  return this
}
export default swap