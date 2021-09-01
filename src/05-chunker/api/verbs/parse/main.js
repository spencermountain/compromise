// find the main verb, from a verb phrase
const getMain = function (vb) {
  let main = vb.match('#Verb+')
  if (main.wordCount() > 1) {
    // main = main.not('(#Adverb|#Negative|#Auxiliary|#Particle)')
    main = main.not('#Negative')
    main = main.not('#Auxiliary')
    main = main.not('#Modal')
    // main = main.match('!#Particle')
  }
  // just get the last one
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
