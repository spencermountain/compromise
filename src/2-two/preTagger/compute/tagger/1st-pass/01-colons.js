import { Val, Email, PhoneNumber, Expr } from '../../../tagSet/_lib.js'
const byPunctuation = function (terms, i, model, world) {
  const setTag = world.methods.one.setTag
  // colon following first word
  // edit: foo
  // breaking: foobar
  if (i === 0 && terms.length >= 3) {
    const hasColon = /:/
    const post = terms[0].post
    if (hasColon.test(post)) {
      // phone: 555-2938
      const nextTerm = terms[1]
      if (nextTerm.tags.has(Val) || nextTerm.tags.has(Email) || nextTerm.tags.has(PhoneNumber)) {
        return
      }
      //
      setTag([terms[0]], Expr, world, null, `2-punct-colon''`)
    }
  }
}
export default byPunctuation
