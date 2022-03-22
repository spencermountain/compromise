import isSubordinate from './isSubordinate.js'
import isPlural from './isPlural.js'

const getRoot = function (m) {
  let tmp = m.clone()
  tmp = tmp.match('#Noun+')
  tmp = tmp.remove('(#Adjective|#Preposition|#Determiner|#Value)')
  // team's captain
  if (tmp.has('#Possessive .? #Noun')) {
    tmp = tmp.remove('#Possessive')
  }
  return tmp.first()
}

const parseNoun = function (m) {
  let root = getRoot(m)
  return {
    determiner: m.match('#Determiner').eq(0),
    adjectives: m.match('#Adjective'),
    number: m.values(),
    isPlural: isPlural(m, root),
    isSubordinate: isSubordinate(m),
    root: root,
  }
}
export default parseNoun
