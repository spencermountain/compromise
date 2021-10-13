const notPlural = '(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)'

const isPlural = function (m, root) {
  // these can't be plural
  if (root.has(notPlural) === true) {
    return false
  }
  // two singular nouns are plural noun phrase
  if (m.has('#Noun and #Noun')) {
    return true
  }
  if (m.has('#Plural')) {
    return true
  }
  return false
}
export default isPlural
