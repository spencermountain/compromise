import { getTense } from '../lib.js'
const keep = { tags: true }

// all verb forms are the same
const toGerund = function (vb, parsed) {
  const { verbToInfinitive, verbConjugate } = vb.methods.two.transform
  const { root, auxiliary } = parsed
  if (vb.has('#Gerund')) {
    return vb
  }
  let str = root.text('normal')
  str = verbToInfinitive(str, vb.model, getTense(root))
  let gerund = verbConjugate(str, vb.model).Gerund
  if (gerund) {
    vb.replace(root, gerund, keep)
  }
  // remove any auxiliary
  if (auxiliary.found) {
    auxiliary.terms().forEach(m => {
      vb.remove(m) //super awkward
    })
  }
  // remove any auxiliary
  vb.fullSentence().compute(['preTagger', 'postTagger', 'chunks'])
  return vb
}
export default toGerund
