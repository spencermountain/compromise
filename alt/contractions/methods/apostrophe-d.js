const hasContraction = /'/
//look for a past-tense verb
const hasPastTense = (terms, i) => {
  let after = terms.slice(i + 1, i + 3)
  return after.some(t => t.tags.has('PastTense'))
}
// he'd walked -> had
// how'd -> did
// he'd go -> would
const _apostropheD = function (terms, i) {
  let before = terms[i].normal.split(hasContraction)[0]
  // what'd, how'd
  if (before === 'how' || before === 'what') {
    return [before, 'did']
  }
  if (hasPastTense(terms, i) === true) {
    return [before, 'had']
  }
  // had/would/did
  return [before, 'would']
}
export default _apostropheD
