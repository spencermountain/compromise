const inflect = require('../transforms/inflect')
const conjugate = require('../transforms/conjugate')

//takes a basic wordlist and expands it into more words, using science
const doOneWord = function(str, pos, world) {
  //sort words into singular/compound
  if (str.indexOf(' ') === -1) {
    world.lexicon[str] = world.lexicon[str] || pos
  } else {
    let w = str.split(' ')[0]
    world.hasCompound[w] = true //cache for quick-lookups
    world.compounds[str] = pos
  }
  //pluralize singular nouns
  if (pos === 'Singular') {
    let plural = inflect(str)
    doOneWord(plural, 'Plural', world)
    return
  }
  if (pos === 'Infinitive') {
    let conj = conjugate(str)
    doOneWord(conj.Gerund, 'Gerund', world)
    doOneWord(conj.PastTense, 'PastTense', world)
    doOneWord(conj.PresentTense, 'PresentTense', world)
    return
  }
}

//one does not simply add a world to the lexicon..
const addWords = function(world, obj) {
  const words = Object.keys(obj)
  for (let i = 0; i < words.length; i += 1) {
    doOneWord(words[i], obj[words[i]], world)
  }
}
module.exports = addWords
