import { getTense, isAreAm } from '../lib.js'
const keep = { tags: true }

// all verb forms are the same
const toGerund = function (vb, parsed) {
  // console.log(form)
  const { verbToInfinitive, verbConjugate } = vb.methods.two.transform
  const { root, auxiliary } = parsed
  if (vb.has('#Gerund')) {
    return vb
  }

  // conjugate '-ing' verb
  let str = root.text('normal')
  str = verbToInfinitive(str, vb.model, getTense(root))
  let gerund = verbConjugate(str, vb.model).Gerund
  // 'are walking', 'is walking'
  if (gerund) {
    gerund = `${isAreAm(vb, parsed)} ${gerund}`
    // console.log(root, gerund)
    // vb.match(root).debug()
    vb.replace(root, gerund, keep)
  }

  // remove any existing auxiliary
  if (auxiliary.found) {
    vb.remove(auxiliary)
  }
  vb.replace('not is', 'is not')
  vb.replace('not are', 'are not')
  vb.fullSentence().compute(['preTagger', 'postTagger', 'chunks'])
  return vb
}
export default toGerund
