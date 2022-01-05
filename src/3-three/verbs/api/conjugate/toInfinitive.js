import { doDoes, getTense } from '../lib.js'

// all verb forms are the same
const toInfinitive = function (vb, parsed) {
  const { verbToInfinitive } = vb.methods.two.transform
  const { root, auxiliary } = parsed
  root.freeze()
  let str = root.text('normal')
  str = verbToInfinitive(str, vb.model, getTense(root))
  if (str) {
    root.repair()
    vb.replace(root, str)
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
