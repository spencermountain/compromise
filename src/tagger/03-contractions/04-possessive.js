const hasApostropheS = /([a-z\u00C0-\u00FF]+)'s$/i

const blacklist = {
  "that's": true,
  "there's": true,
}
const isPossessive = (term, nextTerm) => {
  //a pronoun can't be possessive - "he's house"
  if (term.tags.Pronoun || term.tags.QuestionWord) {
    return false
  }
  if (blacklist.hasOwnProperty(term.normal)) {
    return false
  }
  //if end of sentence, it is possessive - "was spencer's"
  if (!nextTerm) {
    return true
  }
  //an infinitive is probably mis-tagged - 'jamie's bite'
  if (nextTerm.tags.Infinitive) {
    return true
  }
  //a gerund suggests 'is walking'
  if (nextTerm.tags.VerbPhrase) {
    return false
  }
  //spencer's house
  if (nextTerm.tags.Noun) {
    return true
  }
  //rocket's red glare
  // if (nextTerm.tags.Adjective && ts.terms[i + 2] && ts.terms[i + 2].tags.Noun) {
  //   return true
  // }
  //an adjective suggests 'is good'
  if (nextTerm.tags.Adjective || nextTerm.tags.Adverb || nextTerm.tags.Verb) {
    return false
  }
  return false
}
// const isWas = () => {}
// const isHas = () => {}
// const isAre = () => {}

const checkPossessive = function(term, phrase) {
  if (hasApostropheS.test(term.normal) === true) {
    let nextTerm = phrase.pool.get(term.next)

    //spencer's thing vs spencer-is
    if (term.tags.Possessive || isPossessive(term, nextTerm) === true) {
      term.tag('#Possessive')
      return null
    }
    //'spencer is'
    let found = term.normal.match(hasApostropheS)
    if (found !== null) {
      return [found[1], 'is']
    }
  }
  return null
}
module.exports = checkPossessive
