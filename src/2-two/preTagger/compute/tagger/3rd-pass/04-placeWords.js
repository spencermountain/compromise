const isTitleCase = str => /^\p{Lu}[\p{Ll}'’]/u.test(str)

// words that can fit inside a place
const placeCont = new Set([
  'national',
  'federal',
  'state',
  'provincial',
  'municipal',
  'local',
  'city',
  'western',
  'eastern',
  'northern',
  'southern',
  'great',
  'historic',
  'historical',
  'memorial',
])

const isPlace = function (term, i, yelling) {
  if (!term) {
    return false
  }
  if (term.tags.has('Organization') || term.tags.has('Possessive')) {
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

  // 'river', delta, street, etc
  if (placeWords[str] === true) {
    //loop backward - 'Foo River ...'
    for (let n = i - 1; n >= 0; n -= 1) {
      if (placeCont.has(terms[n].normal)) {
        continue
      }
      if (isPlace(terms[n], n, yelling)) {
        setTag(terms.slice(n, i + 1), 'Place', world, null, '3-[place-of-foo]')
        // return true
        continue
      }
      break
    }
    //loop forward - 'River of Foo...'
    for (let n = i + 1; n < terms.length; n += 1) {
      if (isPlace(terms[n], n, yelling)) {
        setTag(terms.slice(i, n + 1), 'Place', world, null, '3-[foo-place]')
        return true
      }
      if (terms[n].normal === 'of' || placeCont.has(terms[n].normal)) {
        continue
      }
      break
    }
  }
  return null
}
export default tagOrgs
