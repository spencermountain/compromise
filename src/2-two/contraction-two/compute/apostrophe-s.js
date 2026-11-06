const hasContraction = /'/

const hasWords = new Set([
  'been', //the meeting's been ..
  'become', //my son's become
])
const isWords = new Set([
  'what', //it's what
  'how', //it's how
  'when',
  'if', //it's if
  'too',
])
const adjLike = new Set(['too', 'also', 'enough'])
// passive, nearly every time - it's called, he's supposed to
const passive = new Set(['called', 'supposed', 'meant', 'located', 'allowed', 'headed'])

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
    // it's called x - but he's called me
    if (passive.has(t.normal) && !(next && next.tags.has('Pronoun'))) {
      return 'is'
    }
    // the car's parked - but he's left
    if (t.switch === 'Adj|Past' && t.normal !== 'left') {
      // she's tired. she's tired, and ..
      if (!next || /[,;:]/.test(t.post) || next.tags.has('Conjunction')) {
        return 'is'
      }
      // car's parked too, car's parked on ..
      if (adjLike.has(next.normal) || next.tags.has('Preposition')) {
        return 'is'
      }
    }
    // The meeting's scheduled vs The plane's landed
    if (t.tags.has('PastTense')) {
      // meeting's scheduled for, cake's made by
      if (next && (next.normal === 'for' || next.normal === 'by')) {
        return 'is'
      }
      return 'has'
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
