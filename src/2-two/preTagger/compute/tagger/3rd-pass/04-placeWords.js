const isTitleCase = str => /^\p{Lu}[\p{Ll}'’]/u.test(str)

const isPlace = function (term, i, yelling) {
  if (!term) {
    return false
  }
  if (term.tags.has('Person') || term.tags.has('Organization')) {
    return false
  }
  if (term.tags.has('ProperNoun') || term.tags.has('Place')) {
    return true
  }
  // allow anything titlecased to be an org
  if (!yelling && isTitleCase(term.text)) {
    // only tag a titlecased first-word, if it checks-out
    if (i === 0) {
      return term.tags.has('Singular')
    }
    return true
  }
  return false
}

const tagOrgs = function (terms, i, world, yelling) {
  const placeWords = world.model.two.placeWords
  const setTag = world.methods.one.setTag
  let term = terms[i]
  let str = term.machine || term.normal
  if (placeWords[str] === true) {
    // Foo River
    if (terms[i - 1] && isPlace(terms[i - 1], i - 1, yelling)) {
      setTag([terms[i - 1], terms[i]], 'Place', world, null, '3-[foo-place]')
    }
    // River Foo
    if (terms[i + 1] && isPlace(terms[i + 1], i - 1, yelling)) {
      setTag([terms[i], terms[i + 1]], 'Place', world, null, '3-[place-foo]')
    }
  }
  // if (placeWords[str] === true && isPlace(terms[i - 1], i - 1, yelling)) {
  //   // loop backwards, tag organization-like things
  //   for (let t = i; t >= 0; t -= 1) {
  //     if (isPlace(terms[t], t, yelling)) {
  //       setTag([terms[t]], 'Place', world, null, '3-[place-word]')
  //     } else {
  //       break
  //     }
  //   }
  // }
  return null
}
export default tagOrgs
