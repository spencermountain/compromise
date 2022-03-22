const matchVerb = function (m, lemma) {
  const conjugate = m.methods.two.transform.verbConjugate
  let all = conjugate(lemma, m.model)
  if (m.has('#PastTense')) {
    return all.PastTense
  }
  if (m.has('#PresentTense')) {
    return all.PresentTense
  }
  if (m.has('#Gerund')) {
    return all.Gerund
  }
  return lemma
}

const swapVerb = function (m, lemma) {
  let str = lemma
  if (!m.has('#Infinitive')) {
    str = matchVerb(m, lemma)
  }
  m.replaceWith(str)
}
export default swapVerb