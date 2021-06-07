const hasContraction = /'/

const banList = {
  that: true,
  there: true,
}
const hereThere = {
  here: true,
  there: true,
  everywhere: true,
}

const isPossessive = (terms, i) => {
  let term = terms[i]
  // if we already know it
  if (term.tags.has('Possessive')) {
    return true
  }
  //a pronoun can't be possessive - "he's house"
  if (term.tags.has('Pronoun') || term.tags.has('QuestionWord')) {
    return false
  }
  if (banList.hasOwnProperty(term.reduced)) {
    return false
  }

  //if end of sentence, it is possessive - "was spencer's"
  let nextTerm = terms[i + 1]
  if (!nextTerm) {
    return true
  }
  //a gerund suggests 'is walking'
  if (nextTerm.tags.has('Verb')) {
    //fix 'jamie's bite'
    if (nextTerm.tags.has('Infinitive')) {
      return true
    }
    //fix 'spencer's runs'
    if (nextTerm.tags.has('PresentTense')) {
      return true
    }
    return false
  }
  //spencer's house
  if (nextTerm.tags.has('Noun')) {
    // 'spencer's here'
    if (hereThere.hasOwnProperty(nextTerm.reduced) === true) {
      return false
    }
    return true
  }

  //rocket's red glare
  let twoTerm = terms[i + 2]
  if (twoTerm && twoTerm.tags.has('Noun') && !twoTerm.tags.has('Pronoun')) {
    return true
  }
  //othwerwise, an adjective suggests 'is good'
  if (nextTerm.tags.has('Adjective') || nextTerm.tags.has('Adverb') || nextTerm.tags.has('Verb')) {
    return false
  }
  return false
}

const isHas = (terms, i) => {
  //look for a past-tense verb
  let after = terms.slice(i + 1, i + 3)
  return after.find(t => t.tags.has('PastTense'))
}

// 's -> [possessive, 'has', or 'is']
const apostropheS = function (terms, i) {
  // !possessive, is/has
  let before = terms[i].normal.split(hasContraction)[0]
  if (isPossessive(terms, i) === true) {
    return null //not a contraction.
  }
  // spencer's got -> 'has'
  if (isHas(terms, i)) {
    return [before, 'has']
  }
  return [before, 'is']
}
module.exports = apostropheS
