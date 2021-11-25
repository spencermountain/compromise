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
  if (orgWords[term.normal] === true && isOrg(terms[i - 1])) {
    terms[i].tags.add('Organization')
    // loop backwards, tag organization-like things
    for (let t = terms.length - 1; t >= 0; t -= 1) {
      if (isOrg(terms[t])) {
        terms[t].tags.add('Organization')
      } else {
        break
      }
    }
  }
  return null
}
export default tagOrgs