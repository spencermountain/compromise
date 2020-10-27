//safely add it to the lexicon
const addWord = function (word, tag, lex) {
  if (lex[word] !== undefined) {
    if (typeof lex[word] === 'string') {
      lex[word] = [lex[word]]
    }
    if (typeof tag === 'string') {
      lex[word].push(tag)
    } else {
      lex[word] = lex[word].concat(tag)
    }
  } else {
    lex[word] = tag
  }
}

// blast-out more forms for some given words
const addMore = function (word, tag, world) {
  let lexicon = world.words
  let transform = world.transforms

  // cache multi-words
  let words = word.split(' ')
  if (words.length > 1) {
    //cache the beginning word
    world.hasCompound[words[0]] = true
  }
  // inflect our nouns
  if (tag === 'Singular') {
    let plural = transform.toPlural(word, world)
    lexicon[plural] = lexicon[plural] || 'Plural' // only if it's safe
  }
  //conjugate our verbs
  if (tag === 'Infinitive') {
    let conj = transform.conjugate(word, world)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let w = conj[tags[i]]
      lexicon[w] = lexicon[w] || tags[i] // only if it's safe
    }
  }
  //derive more adjective forms
  if (tag === 'Comparable') {
    let conj = transform.adjectives(word)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let w = conj[tags[i]]
      lexicon[w] = lexicon[w] || tags[i] // only if it's safe
    }
  }
  //conjugate phrasal-verbs
  if (tag === 'PhrasalVerb') {
    //add original form
    addWord(word, 'Infinitive', lexicon)
    //conjugate first word
    let conj = transform.conjugate(words[0], world)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      //add it to our cache
      world.hasCompound[conj[tags[i]]] = true
      //first + last words
      let w = conj[tags[i]] + ' ' + words[1]

      addWord(w, tags[i], lexicon)
      addWord(w, 'PhrasalVerb', lexicon)
    }
  }
  // inflect our demonyms - 'germans'
  if (tag === 'Demonym') {
    let plural = transform.toPlural(word, world)
    lexicon[plural] = lexicon[plural] || ['Demonym', 'Plural'] // only if it's safe
  }
}

// throw a bunch of words in our lexicon
// const doWord = function(words, tag, world) {
//   let lexicon = world.words
//   for (let i = 0; i < words.length; i++) {
//     addWord(words[i], tag, lexicon)
//     // do some fancier stuff
//     addMore(words[i], tag, world)
//   }
// }
module.exports = {
  addWord: addWord,
  addMore: addMore,
}
