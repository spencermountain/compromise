const apostrophes = /[\'‘’‛‵′`´]/

//
const checkPunctuation = function(terms, i, world) {
  let term = terms[i]

  //check hyphenation
  if (term.postText.indexOf('-') !== -1 && terms[i + 1] && terms[i + 1].preText === '') {
    term.tag('Hyphenated', 'has-hyphen', world)
  }

  //an end-tick (trailing apostrophe) - flanders', or Carlos'
  if (apostrophes.test(term.postText) && !apostrophes.test(term.preText)) {
    let endChar = term.normal[term.normal.length - 1]
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
}
module.exports = checkPunctuation
