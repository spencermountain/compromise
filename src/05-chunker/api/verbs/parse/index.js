import getMain from './main.js'
import getGrammar from './getGrammar.js'
import getAdverbs from './adverbs.js'

const getAuxiliary = function (vb, root) {
  let parts = vb.splitBefore(root)
  if (parts.length <= 1) {
    return vb.update([])
  }
  let aux = parts.eq(0).clone()
  aux.remove('(#Adverb|not)')
  return aux
}

const parseVerb = function (view) {
  const { methods, model } = view
  const { verbToInfinitive } = methods.two.transform
  let vb = view.clone()
  vb.contractions().expand()

  const root = getMain(vb)

  let res = {
    root: root,
    adverbs: getAdverbs(vb, root),
    auxiliary: getAuxiliary(vb, root),
  }
  res.grammar = getGrammar(vb, res)
  res.infinitive = verbToInfinitive(root.text('normal'), model, res.grammar.tense)
  return res
}
export default parseVerb
