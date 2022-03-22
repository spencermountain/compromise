const hasContraction = /'/

const isHas = (terms, i) => {
  //look for a past-tense verb
  let after = terms.slice(i + 1, i + 3)
  return after.some(t => t.tags.has('PastTense'))
}

// 's -> [possessive, 'has', or 'is']
const apostropheS = function (terms, i) {
  // possessive, is/has
  let before = terms[i].normal.split(hasContraction)[0]
  // spencer's got -> 'has'
  if (isHas(terms, i)) {
    return [before, 'has']
  }
  // let's
  if (before === 'let') {
    return [before, 'us']
  }
  // allow slang "there's" -> there are
  if (before === 'there') {
    let nextTerm = terms[i + 1]
    if (nextTerm && nextTerm.tags.has('Plural')) {
      return [before, 'are']
    }
  }
  return [before, 'is']
}
export default apostropheS
