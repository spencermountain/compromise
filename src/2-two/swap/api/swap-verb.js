const matchVerb = function (m, lemma) {
  const conjugate = m.methods.two.transform.verb.conjugate
  const all = conjugate(lemma, m.model)
  if (m.has('#Ger')) {
    return all.Gerund
  }
  if (m.has('#Past')) {
    return all.PastTense
  }
  if (m.has('#Pres')) {
    return all.PresentTense
  }
  if (m.has('#Ger')) {
    return all.Gerund
  }
  return lemma
}

const swapVerb = function (vb, lemma) {
  let str = lemma
  vb.forEach(m => {
    if (!m.has('#Inf')) {
      str = matchVerb(m, lemma)
    }
    m.replaceWith(str)
  })
  return vb
}
export default swapVerb