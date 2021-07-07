const hasApostropheS = /([a-z\u00C0-\u00FF]+)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]s$/i

const banList = {
  that: true,
  there: true,
}
const hereThere = {
  here: true,
  there: true,
  everywhere: true,
}
const isPossessive = (term, pool) => {
  // if we already know it
  if (term.tags.Possessive) {
    return true
  }
  //a pronoun can't be possessive - "he's house"
  if (term.tags.Pronoun || term.tags.QuestionWord) {
    return false
  }
  if (banList.hasOwnProperty(term.reduced)) {
    return false
  }
  //if end of sentence, it is possessive - "was spencer's"
  let nextTerm = pool.get(term.next)
  if (!nextTerm) {
    return true
  }
  //a gerund suggests 'is walking'
  if (nextTerm.tags.Verb) {
    //fix 'jamie's bite'
    if (nextTerm.tags.Infinitive) {
      return true
    }
    //fix 'spencer's runs'
    if (nextTerm.tags.PresentTense) {
      return true
    }
    return false
  }

  //spencer's house
  if (nextTerm.tags.Noun) {
    // 'spencer's here'
    if (hereThere.hasOwnProperty(nextTerm.reduced) === true) {
      return false
    }
    return true
  }
  //rocket's red glare
  let twoTerm = pool.get(nextTerm.next)
  if (twoTerm && twoTerm.tags.Noun && !twoTerm.tags.Pronoun) {
    return true
  }
  //othwerwise, an adjective suggests 'is good'
  if (nextTerm.tags.Adjective || nextTerm.tags.Adverb || nextTerm.tags.Verb) {
    return false
  }
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

const checkPossessive = function (term, phrase, world) {
  //the rest of 's
  let found = term.text.match(hasApostropheS)
  if (found !== null) {
    //spencer's thing vs spencer-is
    if (isPossessive(term, phrase.pool) === true) {
      term.tag('#Possessive', 'isPossessive', world)
      return null
    }
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
