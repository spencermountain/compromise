import getMain from './main.js'
import getAdverbs from './adverbs.js'

const getAuxiliary = function (vb, root) {
  let parts = vb.splitBefore(root)
  if (parts.length <= 1) {
    return vb.none()
  }
  let aux = parts.eq(0).clone()
  aux.remove('(#Adverb|not)')
  return aux
}

const getNegative = function (vb) {
  return vb.match('not')
}

// pull-apart phrasal-verb into verb-particle
const getPhrasal = function (root) {
  let particle = root.match('#Particle$')
  return {
    verb: root.not(particle),
    particle: particle,
  }
}

const parseVerb = function (view) {
  const { methods, model } = view
  let vb = view.clone()
  vb.contractions().expand()

  const root = getMain(vb)

  let res = {
    root: root,
    adverbs: getAdverbs(vb, root),
    auxiliary: getAuxiliary(vb, root),
    negataive: getNegative(vb),
    phrasal: getPhrasal(root),
  }
  return res
}
export default parseVerb
