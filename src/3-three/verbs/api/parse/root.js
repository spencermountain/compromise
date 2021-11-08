// find the main verb, from a verb phrase
const getMain = function (vb) {
  let root = vb
  if (vb.wordCount() > 1) {
    root = vb.not('(#Negative|#Auxiliary|#Modal|#Adverb|#Prefix)')
    // main = main.match('!#Particle')
  }
  // fallback to just the last word, sometimes
  if (root.length > 1 && !root.has('#Phrasal #Particle')) {
    root = root.last()
  }
  // look for more modals
  root = root.not('(want|wants|wanted) to')
  // look for more auxiliaries
  // if (root.has('was #Verb')) {
  //   root = root.not('was')
  // }

  // root = root.not('[(want|wants|wanted) to] #PresentTense', 0)
  // fallback
  if (!root.found) {
    root = vb.not('#Negative')
    return root
  }
  return root
}
export default getMain
