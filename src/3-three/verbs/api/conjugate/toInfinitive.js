const getTense = (root) => {
  let tense = null
  if (root.has('#Participle')) {
    return 'Participle'
  }
  if (root.has('#PastTense')) {
    return 'PastTense'
  }
  return tense
}

// all verb forms are the same
const toPresent = function (vb, parsed) {
  const { verbToInfinitive } = vb.methods.two.transform
  const { root, auxiliary } = parsed
  root.freeze()
  let str = root.text('normal')
  str = verbToInfinitive(str, vb.model, getTense(root))
  if (str) {
    vb.replace(root, str)
  }
  // remove any auxiliary
  if (auxiliary.found) {
    auxiliary.terms().forEach(m => {
      vb.remove(m.text('normal')) //super awkward
    })
  }
  vb.fullSentence().compute(['preTagger', 'postTagger', 'chunks'])
  return vb
}
export default toPresent
