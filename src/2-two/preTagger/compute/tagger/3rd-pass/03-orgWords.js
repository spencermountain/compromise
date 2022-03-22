import fastTag from '../_fastTag.js'

const isTitleCase = function (str) {
  return /^[A-Z][a-z'\u00C0-\u00FF]/.test(str)
}

const isOrg = function (term) {
  if (!term) {
    return false
  }
  if (term.tags.has('ProperNoun') || term.tags.has('Organization') || term.tags.has('Acronym')) {
    return true
  }
  // allow anything titlecased to be an org
  if (isTitleCase(term.text)) {
    return true
  }
  return false
}

const tagOrgs = function (terms, i, model) {
  const orgWords = model.two.orgWords
  let term = terms[i]
  let str = term.machine || term.normal
  if (orgWords[str] === true && isOrg(terms[i - 1])) {
    fastTag(terms[i], 'Organization', '3-[org-word]')
    // loop backwards, tag organization-like things
    for (let t = i; t >= 0; t -= 1) {
      if (isOrg(terms[t])) {
        fastTag(terms[t], 'Organization', '3-[org-word]')
      } else {
        break
      }
    }
  }
  return null
}
export default tagOrgs