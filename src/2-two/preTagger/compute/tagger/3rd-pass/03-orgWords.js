import { setTag, isTitleWord } from '../_lib.js'
import { hasAny } from '../../../../_lib.js'
import { First, Place, Prop, Org, Acronym } from '../../../tagSet/_lib.js'
// the debug reason for every tag this pass sets
const reason = '3-org-word'

const isOrg = function (term, i, yelling) {
  if (!term) {
    return false
  }
  if (hasAny(term, First, Place)) {
    return false
  }
  if (hasAny(term, Prop, Org, Acronym)) {
    return true
  }
  // allow anything titlecased to be an org
  return isTitleWord(term, i, yelling)
}

const tagOrgs = function (terms, i, world, yelling) {
  const orgWords = world.model.two.orgWords
  const term = terms[i]
  const str = term.machine || term.normal
  if (orgWords[str] === true && isOrg(terms[i - 1], i - 1, yelling)) {
    setTag([terms[i]], Org, world, reason)
    // loop backwards, tag organization-like things
    for (let t = i; t >= 0; t -= 1) {
      if (isOrg(terms[t], t, yelling)) {
        setTag([terms[t]], Org, world, reason)
      } else {
        break
      }
    }
  }
  return null
}
export default tagOrgs
