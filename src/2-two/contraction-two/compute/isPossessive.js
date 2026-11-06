const banList = {
  that: true,
  there: true,
  let: true,
  here: true,
  everywhere: true,
}

// an object can't be 'is' - "in sunday's", "of Enron's", "at Moe's"
const beforePossessive = new Set(['in', 'by', 'for', 'of', 'at', 'with', 'to', 'on', 'from', 'about', 'into'])
// "Kathy's and Mary's", "a master's of science"
const joiners = new Set(['and', 'or', 'nor', 'but', '&', 'of'])
// things that are done, and not owned - Mom's cooked dinner, John's parked here
const bareObject = new Set(['dinner', 'lunch', 'breakfast', 'supper', 'work', 'school', 'college', 'home', 'here', 'there'])
const adjLike = new Set(['too', 'also', 'enough', 'about'])
const nounLike = new Set(['is', 'are', 'did', 'were', 'could', 'should', 'must', 'had', 'have'])
// "is was" or "has was" can't happen, so a copula means the 's is possessive
const copulas = new Set(['is', 'are', 'was', 'were', 'am'])

const isPossessive = (terms, i) => {
  const term = terms[i]
  // these can't be possessive
  if (Object.hasOwn(banList, term.machine || term.normal)) {
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
  const nextTerm = terms[i + 1]
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
  // these only follow 'is' or 'has' - the man in black's gonna
  if (/^(gonna|gotta|got|been)$/.test(nextTerm.normal)) {
    return false
  }
  // "Kathy's, not mine" and "Kathy's and Mary's"
  if (/[,;:]/.test(term.post) || joiners.has(nextTerm.normal)) {
    return true
  }
  // a title - Verne's The Mysterious Island
  if (nextTerm.tags.has('Determiner') && /^[A-Z]/.test(nextTerm.text)) {
    return true
  }
  // "of Enron's", or "of the region's"
  let prev = terms[i - 1]
  if (prev && prev.tags.has('Determiner') && terms[i - 2]) {
    prev = terms[i - 2]
  }
  if (prev && beforePossessive.has(prev.normal)) {
    return true
  }
  // the sun's setting vs the artist's painting
  // gerund = is,  noun = possessive
  // (we are doing some dupe-work of the switch classifier here)
  if (nextTerm.switch == 'Noun|Gerund') {
    const next2 = terms[i + 2]
    // the artist's painting.
    if (!next2) {
      if (term.tags.has('Actor') || term.tags.has('ProperNoun')) {
        return true
      }
      return false
    }
    // the artist's painting is..
    if (next2.tags.has('Copula')) {
      return true
    }
    // the cat's sleeping on ..
    if (next2.normal === 'on' || next2.normal === 'in') {
      return false
    }
    return false
  }
  //a gerund suggests 'is walking'
  if (nextTerm.tags.has('Verb')) {
    // 'leonard's was closed'
    if (copulas.has(nextTerm.normal)) {
      return true
    }
    //fix 'jamie's bite'
    if (nextTerm.tags.has('Infinitive')) {
      return true
    }
    //'jamaica's growing'
    if (nextTerm.tags.has('Gerund')) {
      return false
    }
    //fix 'spencer's runs'
    if (nextTerm.tags.has('PresentTense')) {
      return true
    }
    // a describing word, then a thing - Fiona's planned attack, Bush's proposed risky plans
    const two = terms[i + 2]
    const three = terms[i + 3]
    if (two && /ed$/.test(nextTerm.normal)) {
      // but not Mom's cooked dinner, Mary's visited Paris, John's finished today
      const isThing = two.tags.has('Noun') && !['ProperNoun', 'Pronoun', 'Date'].some(tag => two.tags.has(tag))
      // Mom's baked cookies. - a sentence with no other verb needs the 's to be one
      const needsVerb = i === 0 && two.tags.has('Plural') && !terms.some((t, n) => n !== 1 && t.tags.has('Verb'))
      if (isThing && !bareObject.has(two.normal) && !needsVerb) {
        return true
      }
      if (three && two.tags.has('Adjective') && three.tags.has('Noun') && !three.tags.has('Pronoun')) {
        return true
      }
    }
    return false
  }

  // john's nuts
  if (nextTerm.switch === 'Adj|Noun') {
    const twoTerm = terms[i + 2]
    if (!twoTerm) {
      return false //adj
    }
    // john's nuts were..
    if (nounLike.has(twoTerm.normal)) {
      return true
    }
    // john's nuts about..
    if (adjLike.has(twoTerm.normal)) {
      return false //adj
    }
  }
  //spencer's house
  if (nextTerm.tags.has('Noun')) {
    const nextStr = nextTerm.machine || nextTerm.normal
    // 'spencer's here'
    if (nextStr === 'here' || nextStr === 'there' || nextStr === 'everywhere') {
      return false
    }
    // the chair's his - but not Hamlet's mother's
    if (nextTerm.tags.has('Possessive') && !/['’]/.test(nextTerm.text)) {
      return false
    }
    // the captain's John - but not the king's Court
    if (nextTerm.tags.has('Person') && !term.tags.has('ProperNoun')) {
      return false
    }
    return true
  }

  // spencer's tired
  const isAdv = nextTerm.tags.has('Adverb')
  if (nextTerm.tags.has('Adjective') || isAdv) {
    // skip ahead - rocket's big red nozzle, China's most trusted paper
    let o = i + 2
    while (o < i + 4 && terms[o] && terms[o].tags.has('Adjective')) {
      o += 1
    }
    const twoTerm = terms[o]
    //the rocket's red, the car's still here - but not Germany's only hope
    if (!twoTerm || (isAdv && o === i + 2 && nextTerm.normal !== 'only')) {
      return false
    }
    // John's only human, John's still king
    const isRole = twoTerm.tags.has('Actor') || twoTerm.switch === 'Person|Noun'
    if ((nextTerm.normal === 'only' && twoTerm.normal === 'human') || (nextTerm.normal === 'still' && isRole)) {
      return false
    }
    // rocket's red nozzle - but not John's still here
    if (twoTerm.tags.has('Noun') && !twoTerm.tags.has('Pronoun') && !/^t?here$/.test(twoTerm.normal)) {
      //project's behind schedule
      const str = nextTerm.normal
      if (str === 'above' || str === 'below' || str === 'behind') {
        return false
      }
      return true
    }
    // rocket's red glare
    if (twoTerm.switch === 'Noun|Verb') {
      return true
    }
    //othwerwise, an adjective suggests 'is good'
    return false
  }
  // baby's first steps
  if (nextTerm.tags.has('Value')) {
    return true
  }
  // otherwise not possessive
  return false
}
export default isPossessive
