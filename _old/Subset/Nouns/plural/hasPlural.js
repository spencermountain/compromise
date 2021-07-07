const noPlural = '(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)'

//certain words can't be plural, like 'peace'
const hasPlural = function (doc) {
  if (doc.has('#Plural') === true) {
    return true
  }
  // these can't be plural
  if (doc.has(noPlural) === true) {
    return false
  }
  return true
}

module.exports = hasPlural
