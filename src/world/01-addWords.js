const nounFns = require('../transforms/nouns')
const verbFns = require('../transforms/verbs')
const adjFns = require('../transforms/adjectives')

//takes a basic wordlist and expands it into more words, using science
const doOneWord = function(str, pos, world) {
  //sort words into singular/compound
  let words = str.split(' ')
  if (words.length === 1) {
    world.lexicon[str] = world.lexicon[str] || pos
  } else if (pos === 'PhrasalVerb') {
    world.hasCompound[words[0]] = true
    world.compounds[str] = ['Infinitive', 'PhrasalVerb']
    //conjugate phrasal verbs - 'walk up' → 'walked up'
    let conj = verbFns(words[0])
    let tags = Object.keys(conj)
    tags.forEach(tag => {
      let word = conj[tag] + ' ' + words[1]
      world.compounds[word] = [tag, 'PhrasalVerb']
      world.hasCompound[conj[tag]] = true
    })
    return
  } else {
    world.hasCompound[words[0]] = true //cache first word for quick-lookups
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
