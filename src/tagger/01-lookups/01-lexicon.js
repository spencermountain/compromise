//match 'super bowl' etc. in the lexicon
const tryMultiple = function(terms, t, world) {
  let compounds = world.compounds
  //try a two-word version
  let txt = terms[t].normal + ' ' + terms[t + 1].normal
  if (compounds[txt] !== undefined && compounds.hasOwnProperty(txt) === true) {
    terms[t].tag(compounds[txt], 'lexicon-two', world)
    terms[t + 1].tag(compounds[txt], 'lexicon-two', world)
    return true
  }
  //try a three-word version?
  if (t + 2 < terms.length) {
    txt += ' ' + terms[t + 2].normal
    if (compounds[txt] !== undefined && compounds.hasOwnProperty(txt) === true) {
      terms[t].tag(compounds[txt], 'lexicon-three', world)
      terms[t + 1].tag(compounds[txt], 'lexicon-three', world)
      terms[t + 2].tag(compounds[txt], 'lexicon-three', world)
      return true
    }
  }
  return false
}

//
const checkLexicon = function(terms, world) {
  let lex = world.lexicon
  let hasCompound = world.hasCompound
  //go through each term, and check the lexicon
  for (let t = 0; t < terms.length; t += 1) {
    let str = terms[t].normal
    //is it the start of a compound word, like 'super bowl'?
    if (hasCompound[str] === true && t + 1 < terms.length) {
      let found = tryMultiple(terms, t, world)
      if (found === true) {
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
