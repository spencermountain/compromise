const notPlural = '(#Pron|#Place|#Val|#Pers|#Uncountable|#Month|#WeekDay|#Holiday|#Poss)'

const isPlural = function (m, root) {
  // const { looksPlural } = m.world.methods.two
  if (m.has('#Plur')) {
    return true
  }
  // two singular nouns are plural noun phrase
  if (m.has('#NN and #NN')) {
    return true
  }
  if (m.has('(we|they)')) {
    return true
  }
  // these can't be plural
  if (root.has(notPlural)) {
    return false
  }
  if (m.has('#Sing')) {
    return false
  }
  // word-reg fallback
  const str = root.text('normal')
  // ends with a brutal s fallback
  return str.length > 3 && str.endsWith('s') && !str.endsWith('ss')
}
export default isPlural
