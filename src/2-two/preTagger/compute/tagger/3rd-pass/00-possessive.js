import { never, afterVerb, joiners, beforePossessive, isDecade } from '../../../../contraction-two/compute/_words.js'
import { Poss, Sup, Val, Pron, QW, First, Prop, Det, Year } from '../../../tagSet/_lib.js'

const apostropheS = /'s$/
const hasBreak = /[,;:]/

// the rest of a name - "of Keli [McCarthy]'s"
const isName = (term, t) => term.tags.has(Prop) && t?.tags.has(Prop) === true && !hasBreak.test(t.post)
// "of the region's", "about her sister's"
const isLead = t => t?.tags.has(Det) === true || (t?.tags.has(Poss) === true && t.tags.has(Pron))

// (step 4 of the 's decision - the list is in contraction-two/compute/index.js)
// the easy possessives, from lexicon tags alone - the hard ones wait for contractionTwo
const possessive = function (terms, i, world) {
  const term = terms[i]
  // who's, or an apostrophe we have already split
  if (!apostropheS.test(term.normal) || term.implicit || term.tags.has(Poss) || term.tags.has(QW)) {
    return
  }
  // the 1990's
  if (isDecade(term)) {
    return
  }
  if (never.has(term.normal.slice(0, -2))) {
    return
  }
  const next = terms[i + 1]
  if (next && afterVerb.has(next.normal)) {
    return
  }
  // "was spencer's", "Kathy's, not mine"
  let found = !next || hasBreak.test(term.post)
  if (next) {
    // "Kathy's and Mary's", "baby's first steps"
    found ||= joiners.has(next.normal) || next.tags.has(Val)
    // "the world's largest" - but John's happiest
    found ||= next.tags.has(Sup) && next.normal !== 'most' && !term.tags.has(First)
  }
  // step back over a two-word name, then a determiner
  let n = i - 1
  if (isName(term, terms[n])) {
    n -= 1
  }
  if (isName(term, terms[n])) {
    n -= 1
  }
  if (terms[n - 1] && isLead(terms[n])) {
    n -= 1
  }
  found ||= terms[n] !== undefined && beforePossessive.has(terms[n].normal)
  if (!found) {
    return
  }
  // [2020's] election stays a year - setTag would drop it, for being a noun
  if (term.tags.has(Year)) {
    term.tags.add(Poss)
    return
  }
  world.methods.one.setTag([term], Poss, world, null, '2-possessive')
}
export default possessive
