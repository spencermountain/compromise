import { First, Place, Prop, Org, Acronym, Sing } from '../../../tagSet/_lib.js'
const isTitleCase = (str) => /^\p{Lu}[\p{Ll}'’]/u.test(str)

const isOrg = function (term, i, yelling) {
  if (!term) {
    return false
  }
  if (term.tags.has(First) || term.tags.has(Place)) {
    return false
  }
  if (term.tags.has(Prop) || term.tags.has(Org) || term.tags.has(Acronym)) {
    return true
  }
  // allow anything titlecased to be an org
  if (!yelling && isTitleCase(term.text)) {
    // only tag a titlecased first-word, if it checks-out
    if (i === 0) {
      return term.tags.has(Sing)
    }
    return true
  }
  return false
}

const tagOrgs = function (terms, i, world, yelling) {
  const orgWords = world.model.two.orgWords
  const setTag = world.methods.one.setTag
  const term = terms[i]
  const str = term.machine || term.normal
  if (orgWords[str] === true && isOrg(terms[i - 1], i - 1, yelling)) {
    setTag([terms[i]], Org, world, null, '3-[org-word]')
    // loop backwards, tag organization-like things
    for (let t = i; t >= 0; t -= 1) {
      if (isOrg(terms[t], t, yelling)) {
        setTag([terms[t]], Org, world, null, '3-[org-word]')
      } else {
        break
      }
    }
  }
  return null
}
export default tagOrgs