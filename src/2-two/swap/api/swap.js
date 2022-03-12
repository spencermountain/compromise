import swapVerb from './swap-verb.js'

const swapNoun = function (m, lemma) {
  let str = lemma
  if (m.has('#Plural')) {
    const toPlural = m.methods.two.transform.nounToPlural
    str = toPlural(lemma, m.model)
  }
  m.replaceWith(str)
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
  return this
}
export default swap