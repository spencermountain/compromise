const hasApostropheS = /([a-z\u00C0-\u00FF]+)'s$/i

const blacklist = {
  that: true,
  there: true,
}
const isPossessive = (term, nextTerm) => {
  //a pronoun can't be possessive - "he's house"
  if (term.tags.Pronoun || term.tags.QuestionWord) {
    return false
  }
  if (blacklist.hasOwnProperty(term.clean)) {
    return false
  }
  //if end of sentence, it is possessive - "was spencer's"
  if (!nextTerm) {
    return true
  }
  //a gerund suggests 'is walking'
  if (nextTerm.tags.Verb) {
    return false
  }

  //spencer's house
  if (nextTerm.tags.Noun) {
    return true
  }
  //an adjective suggests 'is good'
  if (nextTerm.tags.Adjective || nextTerm.tags.Adverb || nextTerm.tags.Verb) {
    return false
  }
  // fix for 'jamie's bite'
  // rocket's red glare
  return false
}

const isHas = (term, phrase) => {
  let terms = phrase.terms()
  let index = terms.indexOf(term)
  let after = terms.slice(index + 1, index + 3)
  //look for a past-tense verb
  return after.find(t => {
    return t.tags.PastTense
  })
}

const checkPossessive = function(term, phrase, world) {
  //the rest of 's
  let found = term.text.match(hasApostropheS)
  if (found !== null) {
    let nextTerm = phrase.pool.get(term.next)
    console.log(term.clean)

    //spencer's thing vs spencer-is
    if (term.tags.Possessive || isPossessive(term, nextTerm) === true) {
      term.tag('#Possessive', 'isPossessive', world)
      return null
    }
    console.log('  +', term.clean)
    //'spencer is'
    if (found !== null) {
      if (isHas(term, phrase)) {
        return [found[1], 'has']
      }
      return [found[1], 'is']
    }
  }
  return null
}
module.exports = checkPossessive
