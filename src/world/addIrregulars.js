// add words from plurals and conjugations data
const addIrregulars = function(world) {
  //add irregular plural nouns
  let nouns = world.irregulars.nouns
  let words = Object.keys(nouns)
  for (let i = 0; i < words.length; i++) {
    const w = words[i]
    world.lexicon[w] = 'Singular'
    world.lexicon[nouns[w]] = 'Plural'
  }

  // add irregular verb conjugations
  let verbs = world.irregulars.verbs
  let keys = Object.keys(verbs)
  for (let i = 0; i < keys.length; i++) {
    const inf = keys[i]
    world.lexicon[inf] = 'Infinitive'
    //add the others
    Object.keys(verbs[inf]).forEach(tag => {
      world.lexicon[verbs[inf][tag]] = tag
    })
  }
}
module.exports = addIrregulars
