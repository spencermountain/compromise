const banList = {
  that: true,
  there: true,
  let: true,
  here: true,
  everywhere: true,
}

const beforePossessive = {
  in: true,//in sunday's
  by: true,//by sunday's
  for: true,//for sunday's
}

const isPossessive = (terms, i) => {
  let term = terms[i]
  // these can't be possessive
  if (banList.hasOwnProperty(term.machine || term.normal)) {
    return false
  }
  // if we already know it
  if (term.tags.has('Possessive')) {
    return true
  }
  // who's
  if (term.tags.has('QuestionWord')) {
    return false
  }
  // some pronouns are never possessive
  if (term.normal === `he's` || term.normal === `she's`) {
    return false
  }
  //if end of sentence, it is possessive - "was spencer's"
  let nextTerm = terms[i + 1]
  if (!nextTerm) {
    return true
  }
  // "it's a life" vs "run it's business"
  if (term.normal === `it's`) {
    if (nextTerm.tags.has('#Noun')) {
      return true
    }
    return false
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
    let nextStr = nextTerm.machine || nextTerm.normal
    // 'spencer's here'
    if (nextStr === 'here' || nextStr === 'there' || nextStr === 'everywhere') {
      return false
    }
    // the chair's his
    if (nextTerm.tags.has('Possessive')) {
      return false
    }
    // the captain's John 
    if (nextTerm.tags.has('ProperNoun') && !term.tags.has('ProperNoun')) {
      return false
    }
    return true
  }
  // by sunday's final
  if (terms[i - 1] && beforePossessive[terms[i - 1].normal] === true) {
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
export default isPossessive
