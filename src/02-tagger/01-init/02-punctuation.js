const apostrophes = /[\'‘’‛‵′`´]/
const oneLetterAcronym = /^[A-Z]('s|,)?$/

const oneLetterWord = {
  I: true,
  A: true,
}

//
const checkPunctuation = function(terms, i, world) {
  let term = terms[i]

  //check hyphenation
  if (term.post.indexOf('-') !== -1 && terms[i + 1] && terms[i + 1].pre === '') {
    term.tag('Hyphenated', 'has-hyphen', world)
  }

  //an end-tick (trailing apostrophe) - flanders', or Carlos'
  if (apostrophes.test(term.post) && !apostrophes.test(term.pre)) {
    let endChar = term.clean[term.clean.length - 1]
    //flanders'
    if (endChar === 's') {
      term.tag(['Possessive', 'Noun'], 'end-tick', world)
      return
    }
    //chillin'
    if (endChar === 'n') {
      term.tag(['Gerund'], 'chillin', world)
    }
  }
  // NASA
  if (term.isAcronym()) {
    term.tag('Acronym', 'acronym-step', world)
    term.tag('Noun', 'acronym-infer', world)
  } else if (!oneLetterWord.hasOwnProperty(term.text) && oneLetterAcronym.test(term.text)) {
    term.tag('Acronym', 'one-letter-acronym', world)
    term.tag('Noun', 'one-letter-infer', world)
  }
}
module.exports = checkPunctuation
