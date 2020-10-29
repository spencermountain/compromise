const underOver = /^(under|over)-?/

/** match a word-sequence, like 'super bowl' in the lexicon */
const tryMultiple = function (terms, t, world) {
  let lex = world.words
  //try a two-word version
  let txt = terms[t].reduced + ' ' + terms[t + 1].reduced
  if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
    terms[t].tag(lex[txt], 'lexicon-two', world)
    terms[t + 1].tag(lex[txt], 'lexicon-two', world)
    return 1
  }
  //try a three-word version?
  if (t + 2 < terms.length) {
    txt += ' ' + terms[t + 2].reduced
    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-three', world)
      terms[t + 1].tag(lex[txt], 'lexicon-three', world)
      terms[t + 2].tag(lex[txt], 'lexicon-three', world)
      return 2
    }
  }
  //try a four-word version?
  if (t + 3 < terms.length) {
    txt += ' ' + terms[t + 3].reduced
    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-four', world)
      terms[t + 1].tag(lex[txt], 'lexicon-four', world)
      terms[t + 2].tag(lex[txt], 'lexicon-four', world)
      terms[t + 3].tag(lex[txt], 'lexicon-four', world)
      return 3
    }
  }
  return 0
}

/** look at each word in our list of known-words */
const checkLexicon = function (terms, world) {
  let lex = world.words
  let hasCompound = world.hasCompound // use reduced?
  //go through each term, and check the lexicon
  for (let t = 0; t < terms.length; t += 1) {
    let str = terms[t].clean
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
      continue
    }
    // look at reduced version of term, too
    if (str !== terms[t].reduced && lex.hasOwnProperty(terms[t].reduced) === true) {
      terms[t].tag(lex[terms[t].reduced], 'lexicon', world)
      continue
    }
    // prefix strip: try to match 'take' for 'undertake'
    if (underOver.test(str) === true) {
      let noPrefix = str.replace(underOver, '')
      if (lex.hasOwnProperty(noPrefix) === true) {
        terms[t].tag(lex[noPrefix], 'noprefix-lexicon', world)
      }
    }
  }
  return terms
}
module.exports = checkLexicon
