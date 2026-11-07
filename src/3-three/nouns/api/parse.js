import isSubordinate from './isSubordinate.js'
import isPlural from './isPlural.js'

const getRoot = function (m) {
  let tmp = m.clone()
  tmp = tmp.match('#NN+')
  tmp = tmp.remove('(#Adj|#Prep|#Det|#Val)')
  tmp = tmp.not('#Poss')
  tmp = tmp.first()
  if (!tmp.found) {
    return m
  }
  return tmp
}

const parseNoun = function (m) {
  const root = getRoot(m)
  return {
    determiner: m.match('#Det').eq(0),
    adjectives: m.match('#Adj'),
    number: m.values(),
    isPlural: isPlural(m, root),
    isSubordinate: isSubordinate(m),
    root: root,
  }
}
export default parseNoun
