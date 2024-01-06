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
])

// the big clue is the tense of the following verb
const isOrHas = (terms, i) => {
  // look at the contracted word for clues
  // if (terms[i].tags.has('Actor')) {
  //   return 'has'
  // }
  // scan ahead
  for (let o = i + 1; o < terms.length; o += 1) {
    let t = terms[o]
    if (hasWords.has(t.normal)) {
      return 'has'
    }
    if (isWords.has(t.normal)) {
      return 'is'
    }
    // The plane's landed
    if (t.tags.has('PastTense')) {
      return 'has'
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
  }
  return 'is'
}

// 's -> [possessive, 'has', 'is', 'are', 'us']
const apostropheS = function (terms, i) {
  // possessive, is/has
  let before = terms[i].normal.split(hasContraction)[0]
  // let's - >[let, us]
  if (before === 'let') {
    return [before, 'us']
  }
  // allow slang "there's cookies" -> there are
  if (before === 'there') {
    let t = terms[i + 1]
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
