import { setTag } from '../_lib.js'
import { toSet } from '../../../../_lib.js'
import { Adj, Expr } from '../../../tagSet/_lib.js'
// come on
const reason = '3-[first-word]'
  // [well]..
  // [so]
  // [okay]
  // [now]
  // shoot,
  // say,
  // like, hello
const expressions = {
  beforeAdj: toSet('well so okay now'),
  withComma: toSet('shoot say like'),
}

const firstWord = function (terms, world) {
  const str = terms[0].normal
  // "[well] i lose"
  if (expressions.beforeAdj.has(str)) {
    if (terms[1] && !terms[1].tags.has(Adj)) {
      setTag([terms[0]], Expr, world, reason)
    }
    if (terms.length === 1) {
      setTag([terms[0]], Expr, world, reason)
    }
  }
  // "[say], do you"
  if (expressions.withComma.has(str)) {
    if (/,/.test(terms[0].post)) {
      setTag([terms[0]], Expr, world, reason)
    }
  }
}
export default firstWord
