import { doDoes, getTense } from '../lib.js'
const keep = { tags: true }

// all verb forms are the same
const toInfinitive = function (vb, parsed) {
  const { verbToInfinitive } = vb.methods.two.transform
  const { root, auxiliary } = parsed
  let str = root.text('normal')
  str = verbToInfinitive(str, vb.model, getTense(root))
  if (str) {
    vb.replace(root, str, keep)
  }
  // remove any auxiliary terms
  if (auxiliary.found) {
    auxiliary.terms().reverse().forEach(m => {
      vb.remove(m.text())//gross
    })
  }
  // there is no real way to do this
  // 'i not walk'?  'i walk not'?
  if (parsed.negative.found) {
    if (!vb.has('not')) {
      vb.prepend('not')
    }
    let does = doDoes(vb, parsed)
    vb.prepend(does)
  }
  vb.fullSentence().compute(['lexicon', 'preTagger', 'postTagger', 'chunks'])
  return vb
}
export default toInfinitive
