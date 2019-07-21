const nounFns = require('./transforms/nouns')
const verbFns = require('./transforms/verbs')
const adjFns = require('./transforms/adjectives')

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
    let plural = nounFns(str)
    doOneWord(plural, 'Plural', world)
    return
  }
  if (pos === 'Infinitive') {
    let conj = verbFns(str)
    let tags = Object.keys(conj)
    tags.forEach(tag => {
      world.lexicon[conj[tag]] = world.lexicon[conj[tag]] || tag
    })
    return
  }
  if (pos === 'Comparable') {
    let forms = adjFns(str)
    Object.assign(world.lexicon, forms)
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
