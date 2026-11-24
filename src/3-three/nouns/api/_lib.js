// give 'dane' the case of the word it replaced: 'Danes' -> 'Dane', 'DANES' -> 'DANE'
const matchCase = function (original, str) {
  if (original.length > 1 && original === original.toUpperCase() && original !== original.toLowerCase()) {
    return str.toUpperCase()
  }
  if (/^\p{Lu}/u.test(original)) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return str
}

// new words have no chunk, and .nouns() needs one to find them again
const setChunk = function (m) {
  m.docs.forEach(terms => {
    terms.forEach(term => {
      term.chunk = 'Noun'
    })
  })
  return m
}

// a plural possessive keeps its apostrophe in the whitespace - "dogs' bowls"
const hasApostrophe = term => /^['’] /.test(term.post)

// "spencer's" or "the boys'" - these do not inflect
const isPossessive = root => root.has('#Poss') || root.docs.some(terms => terms.some(hasApostrophe))

// an acronym, already pluralized - 'CDs'
const isPluralAcronym = root => /^\p{Lu}{2,}s$/u.test(root.text('trim'))

// these stay as they are, and so do the words around them
const isFixed = root => isPossessive(root) || isPluralAcronym(root)

export { matchCase, setChunk, hasApostrophe, isPossessive, isFixed }
