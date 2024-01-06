const hasContraction = /'/

const hasWords = new Set([
  'been', //the meeting's been ..
])

const isOrHas = (terms, i) => {
  // scan ahead
  for (let o = i + 1; o < terms.length; o += 1) {
    let t = terms[o]

    if (hasWords.has(t.normal)) {
      return 'has'
    }
    // The plane's landed
    if (t.tags.has('PastTense')) {
      return 'has'
    }
    // the cat's sleeping
    if (t.tags.has('Gerund')) {
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
