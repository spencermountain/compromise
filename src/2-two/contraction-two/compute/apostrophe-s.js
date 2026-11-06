const hasContraction = /'/

// these take 'has', whatever follows - he's gone to, he's left for, it's improved
const hasWords = new Set([
  'been', //the meeting's been ..
  'become', //my son's become
  ...'got gotten gone come had left fallen arrived lived worked moved looked talked happened stayed appeared'.split(' '),
  ...'improved increased failed escaped expanded developed turned'.split(' '),
  ...'reacted responded listened agreed returned'.split(' '),
])
const isWords = new Set([
  'what', //it's what
  'how', //it's how
  'when',
  'if', //it's if
  'too',
])
const adjLike = new Set(['too', 'also', 'enough', 'outside', 'inside', 'here', 'there'])
// passive, nearly every time - it's called, he's supposed to
const passive = new Set(['called', 'supposed', 'meant', 'located', 'allowed', 'headed', 'married'])
// passive when reported - it's said that, he's said to be
const reported = new Set(['said', 'believed', 'thought', 'reported', 'rumored', 'estimated', 'claimed'])
// a past word before these is passive - made by, derived from, attracted to
const passivePrep = new Set(['for', 'by', 'to', 'from', 'with', 'as', 'at', 'in', 'into', 'around'])

// the big clue is the tense of the following verb
const isOrHas = (terms, i) => {
  // scan ahead for the next verb or adjective
  for (let o = i + 1; o < terms.length; o += 1) {
    const t = terms[o]
    if (hasWords.has(t.normal)) {
      return 'has'
    }
    if (isWords.has(t.normal)) {
      return 'is'
    }
    // the cat's sleeping
    if (t.tags.has('Gerund')) {
      return 'is'
    }
    // she's the one
    if (t.tags.has('Determiner')) {
      return 'is'
    }
    // the food's ready
    if (t.tags.has('Adjective')) {
      return 'is'
    }
    const next = terms[o + 1]
    const two = terms[o + 2]
    // it's said that, he's said to be - but she's said enough, he's believed in her
    if (reported.has(t.normal)) {
      if (terms[i].normal === `it's` || (next && next.normal === 'to' && two && two.tags.has('Verb'))) {
        return 'is'
      }
      return 'has'
    }
    if (passive.has(t.normal)) {
      // it's called a peach - but he's called me, she's married a doctor
      const hasObject = next && (next.tags.has('Pronoun') || (t.normal !== 'called' && next.tags.has('Determiner')))
      if (!hasObject) {
        return 'is'
      }
    }
    // the car's parked
    if (t.switch === 'Adj|Past') {
      // she's tired. she's tired, and ..
      if (!next || /[,;:]/.test(t.post) || next.tags.has('Conjunction')) {
        return 'is'
      }
      // car's parked too, car's parked on, car's parked outside
      if (adjLike.has(next.normal) || next.tags.has('Preposition') || next.tags.has('Adverb')) {
        return 'is'
      }
      // store's closed early today - but she's lost many friends
      if (next.tags.has('Adjective') && !(two && two.tags.has('Noun'))) {
        return 'is'
      }
    }
    // The meeting's scheduled vs The plane's landed
    if (t.tags.has('PastTense')) {
      // meeting's scheduled for, cake's made by - but baby's learned to crawl
      if (next && passivePrep.has(next.normal) && !(next.normal === 'to' && two && two.tags.has('Verb'))) {
        return 'is'
      }
      return 'has'
    }
    // a later verb is in another clause - it's because he left, but it's now been
    if (t.tags.has('Noun') || t.tags.has('Preposition') || (t.tags.has('Conjunction') && t.normal !== 'now')) {
      return 'is'
    }
  }
  return 'is'
}

// 's -> [possessive, 'has', 'is', 'are', 'us']
const apostropheS = function (terms, i) {
  // possessive, is/has
  const before = terms[i].normal.split(hasContraction)[0]
  // let's - >[let, us]
  if (before === 'let') {
    return [before, 'us']
  }
  // allow slang "there's cookies" -> there are
  if (before === 'there') {
    const t = terms[i + 1]
    if (t && t.tags.has('Plural')) {
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
