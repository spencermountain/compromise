// find the main verb, from a verb phrase
const getMain = function (vb) {
  let root = vb
  if (vb.wordCount() > 1) {
    root = vb.not('(#Neg|#Aux|#Mod|#Adv|#Prefix)')
  }
  // fallback to just the last word, sometimes
  if (root.length > 1 && !root.has('#Phrasal #Particle')) {
    root = root.last()
  }
  // look for more modals
  root = root.not('(want|wants|wanted) to')

  // fallback
  if (!root.found) {
    root = vb.not('#Neg')
    return root
  }
  return root
}
export default getMain
