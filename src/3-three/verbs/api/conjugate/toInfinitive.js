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
const toInfinitive = function (vb, parsed) {
  const { verbToInfinitive } = vb.methods.two.transform
  const { root, auxiliary } = parsed
  root.freeze()
  let str = root.text('normal')
  str = verbToInfinitive(str, vb.model, getTense(root))
  if (str) {
    vb.replace(root, str)
  }
  // remove any auxiliary terms
  if (auxiliary.found) {
    auxiliary.terms().reverse().forEach(m => {
      vb.remove(m)
    })
  }
  vb.fullSentence().compute(['preTagger', 'postTagger', 'chunks'])
  return vb
}
export default toInfinitive
