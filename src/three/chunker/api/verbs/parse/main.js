// find the main verb, from a verb phrase
const getMain = function (vb) {
  if (vb.wordCount() > 1) {
    vb = vb.not('(#Negative|#Auxiliary|#Modal|#Adverb)')
    // main = main.match('!#Particle')
  }
  // fallback to just the last word, sometimes
  if (vb.length > 1 && !vb.has('#Phrasal #Particle')) {
    vb = vb.last()
  }
  // fallback
  if (!vb.found) {
    return vb
  }
  return vb
}
export default getMain
