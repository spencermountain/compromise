const banList = {
  that: true,
  there: true,
  let: true,
  here: true,
  everywhere: true,
}

// an object can't be 'is' - "in sunday's", "of Enron's", "at Moe's"
const beforePossessive = new Set(['in', 'by', 'for', 'of', 'at', 'with', 'to', 'on', 'from', 'about', 'into'])
// "Kathy's and Mary's", "a master's of science", "Australia's per capita"
const joiners = new Set(['and', 'or', 'nor', 'but', '&', 'of', 'per'])
// things that are done, and not owned - Mom's cooked dinner, John's parked here
const bareObject = new Set(['dinner', 'lunch', 'breakfast', 'supper', 'work', 'school', 'college', 'home', 'here', 'there'])
const adjLike = new Set(['too', 'also', 'enough', 'about'])
const nounLike = new Set(['is', 'are', 'did', 'were', 'could', 'should', 'must', 'had', 'have'])
// "is was" or "has was" can't happen, so a copula means the 's is possessive
const copulas = new Set(['is', 'are', 'was', 'were', 'am'])

// one countable thing can't be the object of 'is making' or 'has made' - so it is owned
const isOneThing = t => {
  const not = ['ProperNoun', 'Pronoun', 'Uncountable', 'Date']
  // not 'watching TV'
  const isWord = Boolean(t) && !bareObject.has(t.normal) && !/^[A-Z]+$/.test(t.text)
  return isWord && t.tags.has('Singular') && !not.some(tag => t.tags.has(tag))
}

// is there a verb for this phrase to be the subject of? - Toronto's housing market [set] a record
const hasPredicate = (terms, n) => {
  for (let k = n; k < terms.length; k += 1) {
    const t = terms[k]
    // or a thing 'of' something - Dynegy's planned acquisition [of] Enron
    if (['Modal', 'Copula', 'PastTense', 'PresentTense'].some(tag => t.tags.has(tag)) || (k === n && t.normal === 'of')) {
      return true
    }
    // a new clause - John's played football [and] won
    if (t.tags.has('Conjunction') || t.tags.has('Pronoun') || /[,;:]/.test(t.post)) {
      return false
    }
  }
  return false
}

const isPossessive = (terms, i) => {
  const term = terms[i]
  // a person can do things - John's played football
  const isPerson = term.tags.has('Person') || term.tags.has('Actor')
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
  // the world's largest - but John's happiest
  if (nextTerm.tags.has('Superlative') && nextTerm.normal !== 'most' && !term.tags.has('FirstName')) {
    return true
  }
  // "of Enron's", or the rest of a name - "of Keli McCarthy's"
  let n = i - 1
  const isName = t => term.tags.has('ProperNoun') && t.tags.has('ProperNoun') && !/[,;:]/.test(t.post)
  while (n > i - 3 && terms[n] && isName(terms[n])) {
    n -= 1
  }
  // "of the region's", "about her sister's"
  const lead = terms[n]
  if (lead && terms[n - 1] && (lead.tags.has('Determiner') || (lead.tags.has('Possessive') && lead.tags.has('Pronoun')))) {
    n -= 1
  }
  if (terms[n] && beforePossessive.has(terms[n].normal)) {
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
    // the artist's painting is.., Enron's rating would.., the IMF's managing director
    const isVerb = ['Copula', 'Modal', 'PastTense'].some(tag => next2.tags.has(tag))
    if (isVerb || (isOneThing(next2) && hasPredicate(terms, i + 3))) {
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
    //'jamaica's growing' - but Toronto's housing market
    if (nextTerm.tags.has('Gerund')) {
      return isOneThing(terms[i + 2]) && hasPredicate(terms, i + 3)
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
      const needsVerb = i === 0 && two.tags.has('Plural') && !terms.some((t, k) => k !== 1 && t.tags.has('Verb'))
      // John's played football, the company's raised money - but John's finished product sold well
      const isMass = two.tags.has('Uncountable') && !(three && three.tags.has('Noun'))
      const canOwn = hasPredicate(terms, i + 3) || (!isPerson && !isMass)
      if (isThing && !bareObject.has(two.normal) && !needsVerb && canOwn) {
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
    // the captain's John, my name's Dave - but not TV's John Wayne, or mama's angel
    const isNamed = term.tags.has('Actor') || /^name/.test(term.normal)
    if (isNamed && nextTerm.tags.has('Person') && nextTerm.tags.has('ProperNoun') && !terms[i + 2]) {
      return false
    }
    return true
  }

  // spencer's tired
  const isAdv = nextTerm.tags.has('Adverb')
  if (nextTerm.tags.has('Adjective') || isAdv) {
    // John's busy writing
    if (nextTerm.normal === 'busy' && terms[i + 2] && /ing$/.test(terms[i + 2].normal)) {
      return false
    }
    // skip ahead - rocket's big red nozzle, China's most trusted paper
    const isMore = k => {
      const t = terms[k]
      const after = terms[k + 1]
      // big [red] nozzle, original [first] name
      if (t.tags.has('Adjective') || t.tags.has('Ordinal')) {
        return true
      }
      if (!after) {
        return false
      }
      // financial [and] economic crisis
      if (/^(and|or|&)$/.test(t.normal)) {
        return after.tags.has('Adjective')
      }
      // lower [borrowing] costs helped - but time's just [playing] tricks
      if (t.tags.has('Gerund')) {
        return after.tags.has('Noun') && hasPredicate(terms, k + 2)
      }
      // highly [specialized] tissue
      return isAdv && /ed$/.test(t.normal) && isOneThing(after) && (!isPerson || hasPredicate(terms, k + 2))
    }
    let o = i + 2
    while (o < i + 4 && terms[o] && isMore(o)) {
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
    // America's poor climbed, our nation's elderly would - but Mama's messy isn't she
    const isVerb = ['Modal', 'PastTense', 'Copula'].some(tag => twoTerm.tags.has(tag)) || twoTerm.normal === 'have'
    if (!isAdv && o === i + 2 && isVerb && !twoTerm.implicit && nextTerm.normal !== 'still') {
      return true
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
