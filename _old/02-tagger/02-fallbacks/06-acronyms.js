const oneLetterAcronym = /^[A-Z]('s|,)?$/
const periodSeperated = /([A-Z]\.){2}[A-Z]?/i

const oneLetterWord = {
  I: true,
  A: true,
}

const isAcronym = function (term, world) {
  let str = term.reduced
  // a known acronym like fbi
  if (term.tags.Acronym) {
    return true
  }
  // if (term.tags.Adverb || term.tags.Verb || term.tags.Value || term.tags.Plural) {
  //   return false
  // }
  // known-words, like 'PIZZA' is not an acronym.
  if (world.words[str]) {
    return false
  }
  // long capitalized words are not usually either
  if (str.length > 5) {
    return false
  }
  return term.isAcronym()
}

// F.B.I., NBC, - but not 'NO COLLUSION'
const checkAcronym = function (terms, world) {
  terms.forEach(term => {
    //these are not acronyms
    if (term.tags.RomanNumeral === true) {
      return
    }
    //period-ones F.D.B.
    if (periodSeperated.test(term.text) === true) {
      term.tag('Acronym', 'period-acronym', world)
    }
    //non-period ones are harder
    if (term.isUpperCase() && isAcronym(term, world)) {
      term.tag('Acronym', 'acronym-step', world)
      term.tag('Noun', 'acronym-infer', world)
    } else if (!oneLetterWord.hasOwnProperty(term.text) && oneLetterAcronym.test(term.text)) {
      term.tag('Acronym', 'one-letter-acronym', world)
      term.tag('Noun', 'one-letter-infer', world)
    }
    //if it's a organization,
    if (term.tags.Organization && term.text.length <= 3) {
      term.tag('Acronym', 'acronym-org', world)
    }
    if (term.tags.Organization && term.isUpperCase() && term.text.length <= 6) {
      term.tag('Acronym', 'acronym-org-case', world)
    }
  })
}
module.exports = checkAcronym
