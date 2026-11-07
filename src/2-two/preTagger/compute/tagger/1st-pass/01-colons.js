import { setTag } from '../_lib.js'
import { hasAny } from '../../../../_lib.js'
import { Val, Email, PhoneNumber, Expr } from '../../../tagSet/_lib.js'
const byPunctuation = function (terms, i, model, world) {
  // colon following first word
  // edit: foo
  // breaking: foobar
  if (i === 0 && terms.length >= 3) {
    const hasColon = /:/
    const post = terms[0].post
    if (hasColon.test(post)) {
      // phone: 555-2938
      if (hasAny(terms[1], Val, Email, PhoneNumber)) {
        return
      }
      //
      setTag([terms[0]], Expr, world, `2-punct-colon''`)
    }
  }
}
export default byPunctuation
