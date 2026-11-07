// march/may are a month, a verb, or a modal - decided by their neighbours
// (ported from postTagger match-rules, so it only runs on these two words)
const titleCase = /^\p{Lu}[\p{Ll}'’]/u
// [this] march
const thisNext = new Set(['this', 'next', 'last'])
// march [next] year
const toDate = new Set(['this', 'that', 'next', 'last'])
// march [up] the hill
const direction = new Set(['up', 'down', 'back', 'toward'])

const tag = (terms, t, world, reason) => world.methods.one.setTag(terms, t, world, null, reason)
const isDate = term => term?.tags.has('Date') === true
const isLink = term => term.tags.has('Conjunction') || term.tags.has('Preposition')

// may [be], may [have], may [not], (may [I])
const isVerbAfter = function (term, orPronoun) {
  if (!term) {
    return false
  }
  if (term.tags.has('Infinitive') || term.normal === 'have' || term.normal === 'not') {
    return true
  }
  return orPronoun === true && term.tags.has('Pronoun')
}
// may [also] be
const modalAfter = function (terms, i, orPronoun) {
  const next = terms[i + 1]
  if (isVerbAfter(next, orPronoun)) {
    return true
  }
  return next?.tags.has('Adverb') === true && isVerbAfter(terms[i + 2], orPronoun)
}
// they march, soldiers march, (the march) - a lowercase word after its subject
const hasSubject = function (prev, term, orDet) {
  if (!prev || titleCase.test(term.text)) {
    return false
  }
  if (prev.tags.has('Pronoun') || prev.tags.has('Plural')) {
    return true
  }
  return orDet === true && prev.tags.has('Determiner')
}

// this march → Date Month (not: this march begins, this may be true)
const thisMarch = function (terms, i, world) {
  const term = terms[i]
  const prev = terms[i - 1]
  if (!prev || !thisNext.has(prev.normal)) {
    return
  }
  if (term.normal === 'march' && terms[i + 1]?.tags.has('Infinitive')) {
    return
  }
  if (term.normal === 'may' && modalAfter(terms, i)) {
    return
  }
  tag([prev], 'Date', world, '3-[this-march]')
  tag([term], 'Month', world, '3-[this-march]')
}

// march 5th, may the 5th → Month Date Date (not: they march 5 miles)
const marchFifth = function (terms, i, world) {
  const term = terms[i]
  if (hasSubject(terms[i - 1], term)) {
    return
  }
  const dates = [terms[i + 1]]
  if (terms[i + 1]?.normal === 'the') {
    dates.push(terms[i + 2])
  }
  const value = dates[dates.length - 1]
  if (!value || !value.tags.has('Value')) {
    return
  }
  tag([term], 'Month', world, '3-[march-5th]')
  tag(dates, 'Date', world, '3-[march-5th]')
}

// 5th of march → Date Date Month
const fifthOf = function (terms, i, world) {
  const prev = terms[i - 1]
  const value = terms[i - 2]
  if (!value || prev.normal !== 'of' || !value.tags.has('Value')) {
    return
  }
  tag([value, prev], 'Date', world, '3-[5th-of-march]')
  tag([terms[i]], 'Month', world, '3-[5th-of-march]')
}

// 12 march → Date Month (not: these 5 may leave, $5 may help)
const numberMarch = function (terms, i, world) {
  const term = terms[i]
  const prev = terms[i - 1]
  if (!prev || !prev.tags.has('NumericValue')) {
    return
  }
  if (term.normal === 'may' && modalAfter(terms, i)) {
    return
  }
  tag([prev], 'Date', world, '3-[12-march]')
  tag([term], 'Month', world, '3-[12-march]')
}

// [march] and feb, [may] next year → Month (not: you may leave tomorrow, the march on monday)
const beforeDate = function (terms, i, world) {
  const term = terms[i]
  if (hasSubject(terms[i - 1], term, true)) {
    return
  }
  let next = terms[i + 1]
  if (!next) {
    return
  }
  // march [and] feb, march [next] year
  if (!isDate(next) && (isLink(next) || toDate.has(next.normal))) {
    next = terms[i + 2]
  }
  if (!isDate(next)) {
    return
  }
  tag([term], 'Month', world, '3-[march-and-feb]')
}

// feb to [march], tomorrow in [may] → Month (not: tomorrow may be better, tomorrow we march)
const afterDate = function (terms, i, world) {
  const term = terms[i]
  let prev = terms[i - 1]
  if (!prev) {
    return
  }
  // feb [to] march
  if (!isDate(prev) && isLink(prev)) {
    prev = terms[i - 2]
  }
  if (!isDate(prev)) {
    return
  }
  if (term.normal === 'may' && modalAfter(terms, i, true)) {
    return
  }
  tag([term], 'Month', world, '3-[feb-to-march]')
}

// [march] up the hill → Infinitive
const marchUp = function (terms, i, world) {
  const term = terms[i]
  const next = terms[i + 1]
  if (term.normal !== 'march' || term.tags.has('Date') || !next || !direction.has(next.normal)) {
    return
  }
  tag([term], 'Infinitive', world, '3-[march-up]')
}

// only look around when we hit one of the two words
const ambigDate = function (terms, i, world) {
  const str = terms[i].normal
  if (str !== 'march' && str !== 'may') {
    return
  }
  thisMarch(terms, i, world)
  marchFifth(terms, i, world)
  fifthOf(terms, i, world)
  numberMarch(terms, i, world)
  beforeDate(terms, i, world)
  afterDate(terms, i, world)
  marchUp(terms, i, world)
}
export default ambigDate
