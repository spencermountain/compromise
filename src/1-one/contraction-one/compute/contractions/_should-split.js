// always a contracttion
const always = new Set([
  'here',
  'there',
  'she',
  'it',
  'he',
  'that',
  'here',
  'there',
  'your',
  'who',
  'what',
  'where',
  'why',
  'when',
  'how',
  'let',
  'else',
  'name', //name's dave
  // 'god', //god's gift
])

// // spencer's cool
const afterYes = new Set([
  // adverbs
  'really',
  'very',
  'barely',
  'also',
  'not',
  'just',
  'more',
  'only',
  'often',
  'quite',
  'so',
  'too',
  'well',
])

const shouldSplit = (terms, i) => {
  let term = terms[i]

  const byApostrophe = /'s/
  let [before] = term.normal.split(byApostrophe)
  if (always.has(before)) {
    return true
  }

  // gandhi's so cool
  let nextTerm = terms[i + 1]
  if (nextTerm && afterYes.has(nextTerm.normal)) {
    return true
  }

  // default to posessive
  return false
}
export default shouldSplit
