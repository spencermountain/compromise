// find the main verb, from a verb phrase
const getMain = function (vb) {
  let main = vb.match('#Verb+')
  if (main.wordCount() > 1) {
    main = main.not('(#Negative|#Auxiliary|#Modal)')
    // main = main.match('!#Particle')
  }
  // fallback to just the last word, sometimes
  if (main.length > 1 && !main.has('#Phrasal #Particle')) {
    main = main.last()
  }
  // fallback
  if (!main.found) {
    return vb
  }
  return main
}
export default getMain
