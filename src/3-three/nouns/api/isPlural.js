const notPlural = '(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)'

const isPlural = function (m, root) {
  // const { looksPlural } = m.world.methods.two
  // these can't be plural
  if (root.has(notPlural) === true) {
    return false
  }
  // two singular nouns are plural noun phrase
  if (m.has('#Noun and #Noun')) {
    return true
  }
  if (m.has('(we|they)')) {
    return true
  }
  if (m.has('#Plural')) {
    return true
  }
  if (m.has('#Singular')) {
    return false
  }
  // word-reg fallback
  let str = root.text('normal')
  // ends with a brutal s fallback
  return str.length > 3 && str.endsWith('s') && !str.endsWith('ss')
}
export default isPlural
