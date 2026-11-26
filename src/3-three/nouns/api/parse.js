import isSubordinate from './isSubordinate.js'
import isPlural from './isPlural.js'
import { hasApostrophe } from './_lib.js'

const getRoot = function (m) {
  let tmp = m.clone()
  tmp = tmp.match('#NN+')
  tmp = tmp.remove('(#Adj|#Prep|#Det|#Val)')
  tmp = tmp.not('#Poss')
  // "[dogs'] bowls" (check the raw terms first, it's rare)
  if (tmp.docs.some(terms => terms.some(hasApostrophe))) {
    tmp = tmp.not(tmp.terms().filter(t => hasApostrophe(t.docs[0][0])))
  }
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
