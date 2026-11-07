import { hasBreak, hasApostrophe } from './_lib.js'
import { hasAny, toSet } from '../../_lib.js'
import { Ger, Det, Adj, Vb, Pron, Conj, Prep, Adv, NN, Past, Plur } from '../../preTagger/tagSet/_lib.js'

// these take 'has', whatever follows - he's gone to, he's left for, it's improved, the meeting's been
const hasWords = toSet('been become got gotten gone come had left fallen arrived lived worked moved looked talked happened stayed appeared improved increased failed escaped expanded developed turned reacted responded listened agreed returned')
// it's what, it's how, it's if
const isWords = toSet('what how when if too')
const adjLike = toSet('too also enough outside inside here there')
// passive, nearly every time - it's called, he's supposed to
const passive = toSet('called supposed meant located allowed headed married')
// passive when reported - it's said that, he's said to be
const reported = toSet('said believed thought reported rumored estimated claimed')
// a past word before these is passive - made by, derived from, attracted to
const passivePrep = toSet('for by to from with as at in into around')

// the big clue is the tense of the following verb
const isOrHas = (terms, i) => {
  // scan ahead for the next verb or adjective
  for (let o = i + 1; o < terms.length; o += 1) {
    const t = terms[o]
    // he's kind of given up
    if ((t.normal === 'kind' || t.normal === 'sort') && terms[o + 1] && terms[o + 1].normal === 'of') {
      o += 1
      continue
    }
    if (hasWords.has(t.normal)) {
      return 'has'
    }
    if (isWords.has(t.normal)) {
      return 'is'
    }
    // the cat's sleeping
    if (t.tags.has(Ger)) {
      return 'is'
    }
    // she's the one
    if (t.tags.has(Det)) {
      return 'is'
    }
    // the food's ready
    if (t.tags.has(Adj)) {
      return 'is'
    }
    const next = terms[o + 1]
    const two = terms[o + 2]
    // it's said that, he's said to be - but she's said enough, he's believed in her
    if (reported.has(t.normal)) {
      if (terms[i].normal === `it's` || (next && next.normal === 'to' && two && two.tags.has(Vb))) {
        return 'is'
      }
      return 'has'
    }
    if (passive.has(t.normal)) {
      // it's called a peach - but he's called me, she's married a doctor
      const hasObject = next && (next.tags.has(Pron) || (t.normal !== 'called' && next.tags.has(Det)))
      if (!hasObject) {
        return 'is'
      }
    }
    // the car's parked
    if (t.switch === 'Adj|Past') {
      // she's tired. she's tired, and ..
      if (!next || hasBreak(t) || next.tags.has(Conj)) {
        return 'is'
      }
      // car's parked too, car's parked on, car's parked outside
      if (adjLike.has(next.normal) || hasAny(next, Prep, Adv)) {
        return 'is'
      }
      // store's closed early today - but she's lost many friends
      if (next.tags.has(Adj) && !(two && two.tags.has(NN))) {
        return 'is'
      }
    }
    // The meeting's scheduled vs The plane's landed
    if (t.tags.has(Past)) {
      // meeting's scheduled for, cake's made by - but baby's learned to crawl
      if (next && passivePrep.has(next.normal) && !(next.normal === 'to' && two && two.tags.has(Vb))) {
        return 'is'
      }
      return 'has'
    }
    // a later verb is in another clause - it's because he left
    if (hasAny(t, NN, Prep, Conj)) {
      return 'is'
    }
  }
  return 'is'
}

// 's -> [possessive, 'has', 'is', 'are', 'us']
const apostropheS = function (terms, i) {
  // possessive, is/has
  const before = terms[i].normal.split(hasApostrophe)[0]
  // let's - >[let, us]
  if (before === 'let') {
    return [before, 'us']
  }
  // allow slang "there's cookies" -> there are
  if (before === 'there') {
    const t = terms[i + 1]
    if (t && t.tags.has(Plur)) {
      return [before, 'are']
    }
  }
  // spencer's got -> spencer has got
  if (isOrHas(terms, i) === 'has') {
    return [before, 'has']
  }
  return [before, 'is']
}
export default apostropheS
