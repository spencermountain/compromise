import matchTerm from '../../../match/methods/match/term/doesMatch.js'

// Reject impossible candidates before allocating and sorting their entries.
const canMatch = (obj, haves, terms) => {
  const termCount = terms.length
  if (!(termCount >= obj.minWords)) {
    return false
  }
  for (let j = 0; j < obj.needs.length; j += 1) {
    if (!haves.has(obj.needs[j])) {
      return false
    }
  }
  if (obj.ifNo !== undefined) {
    for (let j = 0; j < obj.ifNo.length; j += 1) {
      if (haves.has(obj.ifNo[j])) {
        return false
      }
    }
  }
  if (obj.wants.length > 0) {
    let count = 0
    for (let j = 0; j < obj.wants.length; j += 1) {
      if (haves.has(obj.wants[j])) {
        count += 1
        if (count >= obj.minWant) {
          break
        }
      }
    }
    if (!(count >= obj.minWant)) {
      return false
    }
  }
  // Required anchors must match the sentence boundary, not just occur in it.
  if (termCount && obj.startTerm && !matchTerm(terms[0], obj.startTerm, 0, termCount)) {
    return false
  }
  if (termCount && obj.endTerm && !matchTerm(terms[termCount - 1], obj.endTerm, termCount - 1, termCount)) {
    return false
  }
  return true
}

export default canMatch
