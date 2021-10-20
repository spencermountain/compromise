// add words from plurals and conjugations data
const addIrregulars = function (world) {
  //add irregular plural nouns
  let nouns = world.irregulars.nouns
  let words = Object.keys(nouns)
  for (let i = 0; i < words.length; i++) {
    const w = words[i]
    world.words[w] = 'Singular'
    world.words[nouns[w]] = 'Plural'
  }

  // add irregular verb conjugations
  let verbs = world.irregulars.verbs
  let keys = Object.keys(verbs)
  for (let i = 0; i < keys.length; i++) {
    const inf = keys[i]
    //add only if it it's safe...
    world.words[inf] = world.words[inf] || 'Infinitive'
    let forms = world.transforms.conjugate(inf, world)
    forms = Object.assign(forms, verbs[inf])
    //add the others
    Object.keys(forms).forEach(tag => {
      world.words[forms[tag]] = world.words[forms[tag]] || tag
      // lexicon should prefer other tags, over participle
      if (world.words[forms[tag]] === 'Participle') {
        world.words[forms[tag]] = tag
      }
    })
  }
}
module.exports = addIrregulars
