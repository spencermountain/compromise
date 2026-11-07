// march/may are a month, a verb, or a modal - decided by their neighbours
// (ported from postTagger match-rules, so it only runs on these two words)
const reason = '3-[ambig-date]'
const titleCase = /^\p{Lu}[\p{Ll}'’]/u
// [this] march
const thisNext = new Set(['this', 'next', 'last'])
// march [next] year
const toDate = new Set(['this', 'that', 'next', 'last'])
// march [up] the hill
const direction = new Set(['up', 'down', 'back', 'toward'])

const has = (term, tag) => term?.tags.has(tag) === true
const isLink = term => has(term, 'Conjunction') || has(term, 'Preposition')
// may [be], may [have], may [not], (may [I])
const isVerbAfter = (term, orPron) =>
  has(term, 'Infinitive') || term?.normal === 'have' || term?.normal === 'not' || (orPron && has(term, 'Pronoun'))
// may [also] be
const modalAfter = (terms, i, orPron) =>
  isVerbAfter(terms[i + 1], orPron) || (has(terms[i + 1], 'Adverb') && isVerbAfter(terms[i + 2], orPron))
// they march, soldiers march, (the march) - a lowercase word after its subject
const hasSubject = (prev, term, orDet) =>
  !titleCase.test(term.text) && (has(prev, 'Pronoun') || has(prev, 'Plural') || (orDet && has(prev, 'Determiner')))

const ambigDate = function (terms, i, world) {
  const term = terms[i]
  const isMay = term.normal === 'may'
  if (!isMay && term.normal !== 'march') {
    return
  }
  const prev = terms[i - 1]
  const next = terms[i + 1]
  // neighbours that become a #Date, if this is a month
  const dates = []
  let month = false
  // this march → Date Month (not: this march begins, this may be true)
  if (prev && thisNext.has(prev.normal)) {
    const verb = isMay ? modalAfter(terms, i) : has(next, 'Infinitive')
    if (!verb) {
      month = true
      dates.push(prev)
    }
  }
  // march 5th, may the 5th → Month Date Date (not: they march 5 miles)
  if (!hasSubject(prev, term)) {
    let value = next
    if (next?.normal === 'the') {
      value = terms[i + 2]
    }
    if (has(value, 'Value')) {
      month = true
      dates.push(next, value)
    }
  }
  // 5th of march → Date Date Month
  if (prev?.normal === 'of' && has(terms[i - 2], 'Value')) {
    month = true
    dates.push(terms[i - 2], prev)
  }
  // 12 march → Date Month (not: these 5 may leave)
  if (has(prev, 'NumericValue') && !(isMay && modalAfter(terms, i))) {
    month = true
    dates.push(prev)
  }
  // [march] and feb, [may] next year → Month (not: you may leave tomorrow, the march on monday)
  if (!hasSubject(prev, term, true)) {
    let date = next
    if (next && !has(next, 'Date') && (isLink(next) || toDate.has(next.normal))) {
      date = terms[i + 2]
    }
    month ||= has(date, 'Date')
  }
  // feb to [march], tomorrow in [may] → Month (not: tomorrow may be better, tomorrow we march)
  let date = prev
  if (prev && !has(prev, 'Date') && isLink(prev)) {
    date = terms[i - 2]
  }
  if (has(date, 'Date') && !(isMay && modalAfter(terms, i, true))) {
    month = true
  }
  if (month) {
    world.methods.one.setTag(dates, 'Date', world, null, reason)
    world.methods.one.setTag([term], 'Month', world, null, reason)
  } else if (!isMay && !has(term, 'Date') && next && direction.has(next.normal)) {
    // [march] up the hill → Infinitive
    world.methods.one.setTag([term], 'Infinitive', world, null, reason)
  }
}
export default ambigDate
