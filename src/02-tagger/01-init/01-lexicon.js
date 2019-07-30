/** match a word-sequence, like 'super bowl' in the lexicon */
const tryMultiple = function(terms, t, world) {
  let lex = world.lexicon
  //try a two-word version
  let txt = terms[t].normal + ' ' + terms[t + 1].normal
  if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
    terms[t].tag(lex[txt], 'lexicon-two', world)
    terms[t + 1].tag(lex[txt], 'lexicon-two', world)
    return 1
  }
  //try a three-word version?
  if (t + 2 < terms.length) {
    txt += ' ' + terms[t + 2].normal
    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-three', world)
      terms[t + 1].tag(lex[txt], 'lexicon-three', world)
      terms[t + 2].tag(lex[txt], 'lexicon-three', world)
      return 2
    }
  }
  return 0
}

/** look at each word in our list of known-words */
const checkLexicon = function(terms, world) {
  let lex = world.lexicon
  let hasCompound = world.hasCompound
  //go through each term, and check the lexicon
  for (let t = 0; t < terms.length; t += 1) {
    let str = terms[t].normal
    //is it the start of a compound word, like 'super bowl'?
    if (hasCompound[str] === true && t + 1 < terms.length) {
      let foundWords = tryMultiple(terms, t, world)
      if (foundWords > 0) {
        t += foundWords //skip any already-found words
        continue
      }
    }
    //try one-word lexicon
    if (lex[str] !== undefined && lex.hasOwnProperty(str) === true) {
      terms[t].tag(lex[str], 'lexicon', world)
    }
  }
  return terms
}
module.exports = checkLexicon
