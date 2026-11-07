import { hasApostrophe } from './_lib.js'
import { hasAny, toSet } from '../../_lib.js'
import { Past, Pres, Inf, Adj, AdjPast } from '../../preTagger/tagSet/_lib.js'

// had better, had done, he'd _ before, he'd _ it, she'd had -> she would have..
const hadWords = toSet('better done before it had')
// 'i'd have' -> i would have, 'she'd be'
const wouldWords = toSet('have be')

//look for a past-tense verb
// You'd mentioned -> you had mentioned
// You'd mention -> you would mention
const hadOrWould = (terms, i) => {
  // scan ahead
  for (let o = i + 1; o < terms.length; o += 1) {
    const t = terms[o]
    // you'd better go
    if (hadWords.has(t.normal)) {
      return 'had'
    }
    // we'd have
    if (wouldWords.has(t.normal)) {
      return 'would'
    }
    // You'd mentioned -> you had mentioned
    if (t.tags.has(Past) || t.switch === AdjPast) {
      return 'had'
    }
    // You'd mention -> you would mention
    if (hasAny(t, Pres, Inf)) {
      return 'would'
    }
    // i'd an issue
    if (t.tags.has('#Det')) {
      return 'had'
    }
    if (t.tags.has(Adj)) {
      return 'would'
    }
  }
  return false
}

// he'd walked -> had
// how'd -> did
// he'd go -> would
const _apostropheD = function (terms, i) {
  const before = terms[i].normal.split(hasApostrophe)[0]
  // what'd, how'd
  if (before === 'how' || before === 'what') {
    return [before, 'did']
  }
  if (hadOrWould(terms, i) === 'had') {
    return [before, 'had']
  }
  // had/would/did
  return [before, 'would']
}
export default _apostropheD
